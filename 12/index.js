const run = require('../run');

const sumIndexes = ({ state, offset }) =>
  [...state].reduce(
    (count, x, i) => count + (x === '#' ? i + offset - 4 : 0),
    0
  );

const buildMap = lines =>
  lines.slice(2).reduce((obj, x) => {
    const key = x.slice(0, 5);
    const result = x.slice(9);
    obj[key] = result;
    return obj;
  }, {});

const getStep = map => ({ state, offset }) => {
  let nextState = '';

  for (let x = 0; x < state.length + 3; x++) {
    nextState += map[('....' + state + '....').substr(x, 5)] || '.';
  }

  const start = nextState.indexOf('#');
  const end = nextState.lastIndexOf('#');

  return { state: nextState.slice(start, end + 1), offset: offset + start - 2 };
};

const partOne = input => {
  const lines = input.split('\n');
  const initialState = '....' + lines[0].slice(15) + '....';
  const map = buildMap(lines);
  const step = getStep(map);

  let offset = initialState.indexOf('#');
  let state = initialState.slice(offset, initialState.lastIndexOf('#') + 1);

  let x = { offset, state };

  for (let i = 0; i < 20; i++) {
    x = step(x);
  }

  return sumIndexes(x);
};

const largeNumberProjection = (initialState, step) => {
  let offset = initialState.indexOf('#');
  let state = initialState.slice(offset, initialState.lastIndexOf('#') + 1);

  let x = { offset, state };

  for (let i = 0; ; i++) {
    let next = step(x);

    if (next.state === x.state) {
      const currentSum = sumIndexes(x);
      const nextSum = sumIndexes(next);

      return n => currentSum + (n - i) * (nextSum - currentSum);
    }

    x = next;
  }
};

const partTwo = input => {
  const lines = input.split('\n');
  const initialState = '....' + lines[0].slice(15) + '....';
  const map = buildMap(lines);
  const step = getStep(map);

  return largeNumberProjection(initialState, step)(50000000000);
};

run(partOne, partTwo);
