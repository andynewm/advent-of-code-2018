const run = require('../run');

const parse = line => {
  const { time, action } = /^\[(?<time>[^\[]+)\] (?<action>.*)$/.exec(
    line,
  ).groups;

  return {
    time: new Date(time),
    action,
  };
};

const maxBy = (array, fn) =>
  array.reduce((max, x) => {
    const value = fn(x);
    if (max.value > value) {
      return max;
    }
    return { value, x };
  }, {}).x;

const getGuardMap = input => {
  const orderedInput = input
    .split('\n')
    .map(parse)
    .sort((a, b) => a.time - b.time);

  let currentGuard;
  let currentArray;
  let sleepTime;
  const guardMap = {};

  orderedInput.forEach(({ time, action }) => {
    switch (action) {
      case 'falls asleep':
        sleepTime = time;
        break;
      case 'wakes up':
        currentArray.push([sleepTime, time]);
        sleepTime = null;
        break;
      default:
        if (sleepTime) {
          console.log('ohono');
        }
        try {
          currentGuard = /#(?<id>\d+)/.exec(action).groups.id;
        } catch (e) {
          console.log(action);
        }
        currentArray = guardMap[currentGuard] || (guardMap[currentGuard] = []);
    }
  });

  return guardMap;
};

const getSleepiestMinute = sleepTimes => {
  const counts = Array(60).fill(0);

  sleepTimes.forEach(([start, end]) => {
    const startMins = start.getMinutes();
    const endMins = end.getMinutes();

    for (let i = startMins; i < endMins; i++) {
      counts[i]++;
    }
  });

  return maxBy(
    counts.map((count, minute) => ({ count, minute })),
    x => x.count,
  );
};

const partOne = input => {
  const guardMap = getGuardMap(input);

  const [guard, sleepTimes] = maxBy(Object.entries(guardMap), ([_, sleep]) =>
    sleep.reduce((total, [start, end]) => total + (end - start) / 60000, 0),
  );

  const sleepiestMinute = getSleepiestMinute(sleepTimes).minute;

  return sleepiestMinute * guard;
};

const partTwo = input => {
  const guardMap = getGuardMap(input);

  const sleepiestGuard = maxBy(
    Object.entries(guardMap).map(([guard, sleepTimes]) => ({
      guard,
      sleepiestMinute: getSleepiestMinute(sleepTimes),
    })),
    x => x.sleepiestMinute.count,
  );

  return sleepiestGuard.guard * sleepiestGuard.sleepiestMinute.minute;
};

run(partOne, partTwo);
