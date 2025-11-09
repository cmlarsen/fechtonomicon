#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

function findJSFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findJSFiles(filePath, fileList);
    } else if (file.endsWith('.js')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Find all JS files in web-build
const webBuildDir = path.join(__dirname, '..', 'web-build');
const jsDir = path.join(webBuildDir, '_expo', 'static', 'js');

if (!fs.existsSync(jsDir)) {
  console.error('Web build directory not found. Please run yarn build:web first.');
  process.exit(1);
}

const jsFiles = findJSFiles(jsDir);
console.log(`Found ${jsFiles.length} JS files to process`);

let fixedCount = 0;

jsFiles.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;

  // Replace import.meta.env checks with proper fallback
  // This transforms: import.meta.env?import.meta.env.MODE:void 0
  // To: (typeof process !== 'undefined' && process.env.NODE_ENV) || 'production'
  content = content.replace(
    /import\.meta\.env\?import\.meta\.env\.MODE:void 0/g,
    '(typeof process !== "undefined" && process.env.NODE_ENV) || "production"'
  );

  // Replace any remaining standalone import.meta references
  content = content.replace(/import\.meta/g, '({})');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✓ Fixed ${path.basename(file)}`);
    fixedCount++;
  }
});

if (fixedCount === 0) {
  console.log('No import.meta references found - build is already clean!');
} else {
  console.log(`\nWeb build fix complete! Fixed ${fixedCount} file(s).`);
}
