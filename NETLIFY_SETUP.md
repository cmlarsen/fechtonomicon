# Netlify Function Setup Guide

## Step 1: Create GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (fine-grained)"
3. Configure the token:
   - **Name**: `fechtonomicon-netlify-function`
   - **Repository access**: Select "Only select repositories" → Choose `fechtonomicon`
   - **Permissions**:
     - ✅ **Contents**: Read and write
     - ✅ **Pull requests**: Read and write
     - ✅ **Metadata**: Read (always included)
4. Click "Generate token"
5. **Copy the token immediately** (you won't see it again!)

## Step 2: Set Up Netlify Environment Variables

1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your site (or create one if you haven't)
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable** and add:

   **Variable 1:**
   - Key: `GITHUB_TOKEN`
   - Value: `[paste your token from Step 1]`
   - Scopes: Check both **Builds** and **Functions**

   **Variable 2 (Optional):**
   - Key: `GITHUB_REPO_OWNER`
   - Value: `yetanothersidequest`
   - Scopes: **Functions**

   **Variable 3 (Optional):**
   - Key: `GITHUB_REPO_NAME`
   - Value: `fechtonomicon`
   - Scopes: **Functions**

5. Click **Save**

## Step 3: Deploy to Netlify

The function will automatically deploy when you push to your connected branch:

```bash
# Make sure your code is committed
git add .
git commit -m "Add Netlify function for edit suggestions"
git push
```

Netlify will:
- Build your web app (`yarn build:web`)
- Deploy the function from `netlify/functions/suggest-edit.ts`
- Make it available at: `https://[your-site].netlify.app/.netlify/functions/suggest-edit`

## Step 4: Update Function URL (if needed)

Check your Netlify site URL and update if different:

1. Go to Netlify dashboard → Your site → **Site details**
2. Copy your site URL (e.g., `https://fechtonomicon.netlify.app`)
3. Update `src/utils/netlifyConfig.ts` if your site URL is different

## Step 5: Test Locally (Optional)

To test the function locally before deploying:

```bash
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Create .env.local file in project root
echo "GITHUB_TOKEN=your_token_here" > .env.local
echo "GITHUB_REPO_OWNER=yetanothersidequest" >> .env.local
echo "GITHUB_REPO_NAME=fechtonomicon" >> .env.local
echo "EXPO_PUBLIC_NETLIFY_FUNCTION_URL=http://localhost:8888/.netlify/functions/suggest-edit" >> .env.local

# Run Netlify dev server
netlify dev
```

The function will be available at `http://localhost:8888/.netlify/functions/suggest-edit`

## Verification Checklist

- [ ] GitHub token created with correct permissions
- [ ] Token added to Netlify environment variables (scoped to Functions)
- [ ] Code committed and pushed
- [ ] Netlify deployment successful (check Deploys tab)
- [ ] Function URL matches your site URL in `netlifyConfig.ts`
- [ ] Tested edit submission in the app

## Troubleshooting

**Function returns 500 error:**
- Check Netlify function logs: Site → Functions → suggest-edit → View logs
- Verify `GITHUB_TOKEN` is set correctly in environment variables
- Ensure token has correct permissions

**Function not found (404):**
- Verify `netlify.toml` has `functions = "netlify/functions"`
- Check that `netlify/functions/suggest-edit.ts` exists
- Ensure deployment completed successfully

**Token errors:**
- Verify token hasn't expired
- Check token has "Contents: Read and write" and "Pull requests: Read and write"
- Ensure token is scoped to the correct repository
