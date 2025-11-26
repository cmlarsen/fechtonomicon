const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const appJsonPath = path.join(__dirname, '..', 'app.json');

// Read files
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));

// Parse current version
const currentVersion = packageJson.version;
const [major, minor, patch] = currentVersion.split('.').map(Number);

console.log(`Current version: ${currentVersion}`);
console.log('Bump the version?');
console.log('1) Major');
console.log('2) Minor');
console.log('3) Patch');
console.log('4) Skip');

rl.question('Select an option (1-4): ', (answer) => {
  let newVersion;

  switch(answer.trim()) {
    case '1':
      newVersion = `${major + 1}.0.0`;
      break;
    case '2':
      newVersion = `${major}.${minor + 1}.0`;
      break;
    case '3':
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
    case '4':
      console.log('Skipping version bump.');
      rl.close();
      return;
    default:
      console.log('Invalid option. Exiting.');
      rl.close();
      process.exit(1);
  }

  console.log(`Bumping version from ${currentVersion} to ${newVersion}`);

  // Update package.json
  packageJson.version = newVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

  // Update app.json
  appJson.expo.version = newVersion;

  // Increment build numbers
  const currentBuildNumber = parseInt(appJson.expo.ios.buildNumber, 10);
  const newBuildNumber = (currentBuildNumber + 1).toString();
  appJson.expo.ios.buildNumber = newBuildNumber;

  const currentVersionCode = appJson.expo.android.versionCode;
  const newVersionCode = currentVersionCode + 1;
  appJson.expo.android.versionCode = newVersionCode;

  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n');

  console.log(`Updated version to ${newVersion}, iOS build to ${newBuildNumber}, Android versionCode to ${newVersionCode}`);

  // Commit changes
  try {
    execSync(`git commit -am "bump version to ${newVersion}"`);
    console.log('Committed changes');
  } catch (error) {
    console.error('Failed to commit changes:', error.message);
    process.exit(1);
  }

  rl.close();
});
