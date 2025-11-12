#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const appJsonPath = path.join(__dirname, '..', 'app.json');

try {
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));

  const currentBuildNumber = appJson.expo?.ios?.buildNumber;

  if (!currentBuildNumber) {
    console.error('❌ Error: iOS buildNumber not found in app.json');
    process.exit(1);
  }

  const newBuildNumber = String(parseInt(currentBuildNumber, 10) + 1);

  appJson.expo.ios.buildNumber = newBuildNumber;

  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n', 'utf8');

  console.log(`✅ Incremented iOS build number: ${currentBuildNumber} → ${newBuildNumber}`);

  // Commit the change
  try {
    const relativePath = path.relative(process.cwd(), appJsonPath);
    execSync(`git add "${relativePath}"`, { stdio: 'inherit' });
    execSync(
      `git commit -m "chore: increment iOS build number to ${newBuildNumber}"`,
      { stdio: 'inherit' }
    );
    console.log('✅ Committed build number change');
  } catch (gitError) {
    console.warn('⚠️  Warning: Could not commit build number change:', gitError.message);
    console.warn('   You may need to commit manually');
  }
} catch (error) {
  console.error('❌ Error incrementing build number:', error.message);
  process.exit(1);
}
