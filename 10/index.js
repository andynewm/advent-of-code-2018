const run = require('../run');

const parseInput = input => {
  const [
    x,
    y,
    dx,
    dy
  ] = /position=< *(-?\d+), *(-?\d+)> velocity=< *(-?\d+), *(-?\d+)>/
    .exec(input)
    .slice(1)
    .map(Number);

  return { x, y, dx, dy };
};

const partOne = input => {
  const t = input
    .split('\n')
    .map(parseInput)
    .map(({ x, y, dx, dy }) => n => ({ x: x + dx * n, y: y + dy * n }));

  let lastSpread;
  let n = 0;
  while (true) {
    n++;
    const coords = t.map(x => x(n));
    const spread =
      Math.max(...coords.map(c => c.x)) - Math.min(...coords.map(c => c.x));
    if (spread > lastSpread) {
      break;
    }
    lastSpread = spread;
  }

  const coords = t.map(x => x(n - 1));
  const minX = Math.min(...coords.map(c => c.x));
  const minY = Math.min(...coords.map(c => c.y));
  const result = [];
  coords.forEach(({ x, y }) => {
    (result[y - minY] || (result[y - minY] = []))[x - minX] = true;
  });

  return (
    '\n' +
    result
      .map(array => [...array].map(v => (v ? '#' : '.')).join(''))
      .join('\n')
  );
};

const partTwo = input => {
  const t = input
    .split('\n')
    .map(parseInput)
    .map(({ x, y, dx, dy }) => n => ({ x: x + dx * n, y: y + dy * n }));

  let lastSpread;
  let n = 0;
  while (true) {
    n++;
    const coords = t.map(x => x(n));
    const spread =
      Math.max(...coords.map(c => c.x)) - Math.min(...coords.map(c => c.x));
    if (spread > lastSpread) {
      break;
    }
    lastSpread = spread;
  }

  return n - 1;
};

run(partOne, partTwo);
