const run = require('../run');

const parseLine = line =>
  /^Step (?<dependency>[A-Z]) must be finished before step (?<step>[A-Z]) can begin.$/.exec(
    line
  ).groups;

const getRules = input =>
  input
    .split('\n')
    .map(parseLine)
    .reduce((map, { step, dependency }) => {
      if (!map.has(dependency)) {
        map.set(dependency, new Set());
      }

      let value = map.get(step);

      if (!value) {
        value = new Set();
        map.set(step, value);
      }

      value.add(dependency);

      return map;
    }, new Map());

let result = '';

const partOne = input => {
  const rules = getRules(input);

  while (rules.size) {
    const candidate = [...rules.entries()]
      .filter(([rule, dependencies]) => !dependencies.size)
      .map(([rule, dependencies]) => rule)
      .sort()[0];

    if (!candidate) {
      break;
    }

    result += candidate;
    rules.delete(candidate);
    for (set of rules.values()) {
      set.delete(candidate);
    }
  }

  return result;
};

const getTime = letter => letter.charCodeAt() - 4;

const partTwo = input => {
  const rules = getRules(input);

  let result = 0;
  let workers = [...Array(5)].map(() => ({ free: true }));

  while (rules.size || workers.some(x => !x.free)) {
    for (const worker of workers) {
      if (!worker.free) {
        if (!--worker.time) {
          worker.free = true;

          for (set of rules.values()) {
            set.delete(worker.job);
          }

          worker.job = null;
        }
      }
    }

    const candidates = [...rules.entries()]
      .filter(([rule, dependencies]) => !dependencies.size)
      .map(([rule, dependencies]) => rule)
      .sort();

    for (const candidate of candidates) {
      const worker = workers.find(x => x.free);
      if (worker) {
        worker.job = candidate;
        worker.time = getTime(candidate);
        worker.free = false;
        rules.delete(candidate);
      }
    }

    result++;
  }

  return result - 1;
};

run(partOne, partTwo);
