const run = require('../run');

const parseLine = line => {
  const { x, y } = /^(?<x>-?\d+), (?<y>-?\d+)$/.exec(line).groups;
  return { x: Number(x), y: Number(y) };
};

const partOne = input => {
  let edges = input
    .split('\n')
    .map((x, index) => ({ ...parseLine(x), index: index.toString() }));

  const map = edges.reduce((obj, { x, y, index }) => {
    obj[`${x}, ${y}`] = index;
    return obj;
  }, {});

  const run = edges => {
    const nextGeneration = {};

    const update = (x, y, index) => {
      const key = `${x}, ${y}`;
      if (key in map) {
        return;
      }
      nextGeneration[key] =
        key in nextGeneration && nextGeneration[key] !== index ? '.' : index;
    };

    edges.forEach(({ index, x, y }) => {
      const key = `${x}, ${y}`;
      map[key] = index;
      update(x + 1, y, index);
      update(x - 1, y, index);
      update(x, y + 1, index);
      update(x, y - 1, index);
    });

    Object.assign(map, nextGeneration);

    return Object.entries(nextGeneration)
      .filter(([key, index]) => index !== '.')
      .map(([key, index]) => {
        return {
          ...parseLine(key),
          index
        };
      });
  };

  Object.values(map).reduce((coll, value) => {
    coll[value] = (coll[value] || 0) + 1;
    return coll;
  }, {});

  let n = 101;
  while (n--) {
    edges = run(edges);
  }

  const liveEdges = new Set(edges.map(x => x.index));
  const counts = Object.values(map).reduce((coll, value) => {
    coll[value] = (coll[value] || 0) + 1;
    return coll;
  }, {});

  return Math.max(
    0,
    ...Object.entries(counts)
      .filter(([key, value]) => !liveEdges.has(key) && key !== '.')
      .map(([key, value]) => value)
  );
};

const distanceBetween = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const sum = array => array.reduce((a, b) => a + b);

const partTwo = input => {
  const points = input.split('\n').map(parseLine);
  const candidates = [].concat(
    ...[...Array(600)].map((_, x) =>
      [...Array(600)].map((_, y) => ({ x: x - 200, y: y - 200 }))
    )
  );

  return candidates
    .map(c => sum(points.map(p => distanceBetween(c, p))))
    .filter(x => x < 10000).length;
};

run(partOne, partTwo);
