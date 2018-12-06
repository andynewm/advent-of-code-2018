const run = require('../run');

function* repeat(array) {
  while (true) yield* array;
}

const partOne = input =>
  input
    .split('\n')
    .map(Number)
    .reduce((total, n) => total + n);

const partTwo = input => {
  const set = new Set();
  let frequency = 0;

  for (let n of repeat(input.split('\n').map(Number))) {
    set.add(frequency);
    frequency += n;

    if (set.has(frequency)) {
      return frequency;
    }
  }
};

run(partOne, partTwo);
