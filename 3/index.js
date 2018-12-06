const run = require('../run');

function* squares({ x1, y1, x2, y2 }) {
  for (let x = x1; x < x2; x++) {
    for (let y = y1; y < y2; y++) {
      yield (key = `${x},${y}`);
    }
  }
}

const getClaims = input =>
  input
    .split('\n')
    .map(
      x =>
        /^#(?<index>\d+) @ (?<x>\d+),(?<y>\d+): (?<width>\d+)x(?<height>\d+)$/.exec(
          x
        ).groups
    )
    .map(({ index, x, y, width, height }) => ({
      index,
      x1: +x,
      y1: +y,
      x2: +x + +width,
      y2: +y + +height
    }));

const getMap = claims =>
  claims.reduce((records, claim) => {
    for (let key of squares(claim)) {
      records[key] = (records[key] || 0) + 1;
    }
    return records;
  }, {});

const partOne = input => {
  const map = getMap(getClaims(input));

  return Object.values(map).filter(x => x > 1).length;
};

const partTwo = input => {
  const claims = getClaims(input);
  const map = getMap(claims);

  return claims.find(claim =>
    [...squares(claim)].every(square => map[square] == 1)
  ).index;
};

run(partOne, partTwo);
