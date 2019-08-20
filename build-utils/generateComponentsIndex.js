const fs = require('fs');
const path = require('path');

const targetDir = '../src/components/';
const indexPath = path.resolve(__dirname, targetDir, 'index.js');

// delete old index.js under src/components/
fs.existsSync(indexPath) && fs.unlink(indexPath, () => {});

const components = fs.readdirSync(path.resolve(__dirname, targetDir));
const dirs = [];
let files = [];
const extension = /.vue$/;

// separate dirs and files under src/components/
components.map(n => {
  const nPath = path.resolve(__dirname, targetDir, n);
  fs.statSync(nPath).isDirectory() ? dirs.push(nPath) : files.push(nPath);
});

// get .vue files. e.g: src/components/**/*.vue
dirs.map(d => {
  fs.readdirSync(d).map(f => {
    if (f.match(extension)) {
      files.push(path.resolve(__dirname, targetDir, d, f));
    }
  });
});

// generate src/components/index.js
const filePath = [];
files
  .filter(f => f.match(extension))
  .map(f => {
    filePath.push(f.split('components')[1].replace(/\\/g, '/'));
  });
fs.writeFileSync(
  indexPath,
  "// This file is auto generated by build/generateComponentsIndex.js.\n// Please don't try to change this file manaually.\n\n",
  { flag: 'a' }
);
for (let i = 0; i < filePath.length; i++) {
  const pairs = filePath[i].split('.')[0].split('/');
  const objectName = pairs[pairs.length - 1];
  const ignore = ['FCascaderItems', 'FPaginationButtons', 'FScroll', 'FToast'];
  if (ignore.indexOf(objectName) >= 0) continue;
  fs.writeFileSync(
    indexPath,
    `export { default as ${objectName} } from '.${filePath[i]}';\n`,
    { flag: 'a' }
  );
}