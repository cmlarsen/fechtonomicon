import type { Handler } from '@netlify/functions';
import { Octokit } from '@octokit/rest';

interface EditRequest {
  cardId: string;
  fieldName: string;
  originalValue: string;
  correctedValue: string;
  term: string;
}

const getDataFilePath = (cardId: string): string => {
  if (cardId.startsWith('italian.long.')) {
    return 'assets/data/italian-longsword-data.json';
  }
  return 'assets/data/german-longsword-data.json';
};

const updateCardField = (
  data: { records: Array<Record<string, unknown>> },
  cardId: string,
  fieldName: string,
  newValue: string
): { records: Array<Record<string, unknown>> } => {
  const cardIndex = data.records.findIndex((record) => record.id === cardId);
  if (cardIndex === -1) {
    throw new Error(`Card with ID ${cardId} not found`);
  }

  const updatedRecords = [...data.records];
  updatedRecords[cardIndex] = {
    ...updatedRecords[cardIndex],
    [fieldName]: newValue,
  };

  return {
    ...data,
    records: updatedRecords,
  };
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const githubToken = process.env.GITHUB_TOKEN;
  const repoOwner = process.env.GITHUB_REPO_OWNER || 'yetanothersidequest';
  const repoName = process.env.GITHUB_REPO_NAME || 'fechtonomicon';

  if (!githubToken) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GitHub token not configured' }),
    };
  }

  let editRequest: EditRequest;
  try {
    editRequest = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON in request body' }),
    };
  }

  const { cardId, fieldName, originalValue, correctedValue, term } = editRequest;

  if (!cardId || !fieldName || !correctedValue || !term) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required fields' }),
    };
  }

  const octokit = new Octokit({ auth: githubToken });
  const dataFilePath = getDataFilePath(cardId);
  const branchName = `edit-${cardId}-${fieldName}-${Date.now()}`
    .replace(/[^a-z0-9-]/gi, '-')
    .toLowerCase();

  try {
    const mainBranch = await octokit.repos.getBranch({
      owner: repoOwner,
      repo: repoName,
      branch: 'main',
    });

    const mainSha = mainBranch.data.commit.sha;

    await octokit.git.createRef({
      owner: repoOwner,
      repo: repoName,
      ref: `refs/heads/${branchName}`,
      sha: mainSha,
    });

    const fileResponse = await octokit.repos.getContent({
      owner: repoOwner,
      repo: repoName,
      path: dataFilePath,
      ref: 'main',
    });

    if (Array.isArray(fileResponse.data) || fileResponse.data.type !== 'file') {
      throw new Error('Expected file, got directory or other type');
    }

    const fileContent = Buffer.from(fileResponse.data.content, 'base64').toString('utf-8');
    const fileSha = fileResponse.data.sha;

    let dataFile: { records: Array<Record<string, unknown>> };
    try {
      dataFile = JSON.parse(fileContent);
    } catch {
      throw new Error('Invalid JSON structure in data file');
    }

    const updatedData = updateCardField(dataFile, cardId, fieldName, correctedValue);
    const updatedContent = JSON.stringify(updatedData, null, 2);
    const updatedContentBase64 = Buffer.from(updatedContent).toString('base64');

    await octokit.repos.createOrUpdateFileContents({
      owner: repoOwner,
      repo: repoName,
      path: dataFilePath,
      message: `Edit suggestion: ${term} - ${fieldName}`,
      content: updatedContentBase64,
      branch: branchName,
      sha: fileSha,
    });

    const prTitle = `Edit suggestion: ${term} - ${fieldName}`;
    const prBody = `**Card:** ${term} (${cardId})
**Field:** ${fieldName}

**Original Value:**
${originalValue}

**Suggested Correction:**
${correctedValue}

---

This PR was automatically created from a user edit suggestion.`;

    const prResponse = await octokit.pulls.create({
      owner: repoOwner,
      repo: repoName,
      title: prTitle,
      head: branchName,
      base: 'main',
      body: prBody,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        prUrl: prResponse.data.html_url,
        prNumber: prResponse.data.number,
      }),
    };
  } catch (error) {
    console.error('Error creating PR:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to create PR',
        message: errorMessage,
      }),
    };
  }
};
