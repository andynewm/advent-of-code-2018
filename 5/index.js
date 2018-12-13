const run = require('../run');

const getReducedLength = array => {
  for (let i = 1; i < array.length; i++) {
    const a = array[i - 1];
    const b = array[i];
    if (a !== b && a.toLowerCase() === b.toLowerCase()) {
      array.splice(i - 1, 2);
      i = i == 1 ? 0 : i - 2;
    }
  }

  return array.length;
};

const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];

const partOne = input => getReducedLength([...input]);

const partTwo = input =>
  Math.min(
    ...alphabet.map(letter =>
      getReducedLength([...input.replace(RegExp(letter, 'ig'), '')]),
    ),
  );

run(partOne, partTwo);
