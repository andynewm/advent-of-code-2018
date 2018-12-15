const run = require('../run');

const getPowerLevel = serial => (x, y) => {
  const rackId = x + 10;
  let power = rackId * y;
  power += serial;
  power *= rackId;
  power = Math.floor(power / 100) % 10;
  return power - 5;
};

const getGrid = serial => {
  const power = getPowerLevel(serial);
  return [...Array(300)].map((_, y) =>
    [...Array(300)].map((_, x) => power(x + 1, y + 1))
  );
};

const powerSum = (grid, x, y) =>
  []
    .concat(...grid.slice(y, y + 3).map(r => r.slice(x, x + 3)))
    .reduce((a, b) => a + b);

const maxBy = (array, fn) =>
  array.reduce((max, x) => {
    const value = fn(x);
    if (max.value > value) {
      return max;
    }
    return { value, x };
  }, {}).x;

const partOne = input => {
  const grid = getGrid(Number(input));

  let max = 0;
  let maxY;
  let maxX;

  for (let x = 0; x < 300; x++) {
    for (let y = 0; y < 300; y++) {
      const power = powerSum(grid, x, y);
      if (power > max) {
        max = power;
        maxY = y + 1;
        maxX = x + 1;
      }
    }
  }

  return `${maxX},${maxY}`;
};

run(partOne, () => {});
