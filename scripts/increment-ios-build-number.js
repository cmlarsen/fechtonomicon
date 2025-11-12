#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

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
} catch (error) {
  console.error('❌ Error incrementing build number:', error.message);
  process.exit(1);
}
