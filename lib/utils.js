const fs = require('fs');
const path = require('path');

const readFile = (filename, dir = './data') => {
  const fullPath = `${dir}${path.sep}${filename}`;
  const data = fs.readFileSync(fullPath, 'utf-8');
  const lines = data.split('\n');
  return lines;
}

module.exports = {
  readFile
}