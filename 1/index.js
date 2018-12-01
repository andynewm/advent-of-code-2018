const fs = require('fs');
const { partOne } = require('./partOne');
const { partTwo } = require('./partTwo');

if (!fs.existsSync('input.txt')) {
  throw new Error(
    "'input.txt' not found. Visit https://adventofcode.com to download"
  );
}

const input = fs.readFileSync('input.txt', 'utf8');

console.log(`Part one: ${partOne(input)}`);
console.log(`Part two: ${partTwo(input)}`);
