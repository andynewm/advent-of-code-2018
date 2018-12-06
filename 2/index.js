const run = require('../run');

const getLetterDistributions = string =>
  Object.values(
    [...string].reduce((obj, x) => {
      obj[x] = (obj[x] || 0) + 1;
      return obj;
    }, {})
  );

const getDifferingIndex = (a, b) => {
  if (a.length != b.length) {
    return null;
  }

  let match;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      if (match !== undefined) {
        return null;
      }

      match = i;
    }
  }

  return match;
};

const partOne = input => {
  const letterCounts = input.split('\n').map(getLetterDistributions);

  const doubleLetters = letterCounts.filter(x => x.includes(2)).length;
  const tripleLetters = letterCounts.filter(x => x.includes(3)).length;

  return doubleLetters * tripleLetters;
};

const partTwo = input => {
  const strings = input.split('\n');

  for (let i = 0; i < strings.length; i++) {
    for (let j = i + 1; j < strings.length; j++) {
      const a = strings[i];
      const b = strings[j];

      const differingIndex = getDifferingIndex(a, b);

      if (differingIndex !== null) {
        return a.slice(0, differingIndex) + a.slice(differingIndex + 1);
      }
    }
  }
};

run(partOne, partTwo);
