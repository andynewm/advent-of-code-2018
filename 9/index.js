const run = require('../run');

function* generateScores(limit) {
  let marble = { value: 0 };
  marble.left = marble;
  marble.right = marble;
  for (let i = 1; i < limit; i++) {
    if (i % 23) {
      marble = marble.right;
      marble = { value: i, left: marble, right: marble.right };
      marble.left.right = marble;
      marble.right.left = marble;
    } else {
      marble = marble.left.left.left.left.left.left.left;
      const score = i + marble.value;
      marble.left.right = marble.right;
      marble.right.left = marble.left;
      marble = marble.right;
      yield { i, score };
    }
  }
}

const parseInput = input => {
  const [players, points] = /(\d+) players; last marble is worth (\d+) points/
    .exec(input)
    .slice(1)
    .map(Number);

  return {
    players,
    points
  };
};

const partOne = input => {
  const { players, points } = parseInput(input);
  const scores = Array(players).fill(0);

  for (let { i, score } of generateScores(points)) {
    scores[i % players] += score;
  }

  return Math.max(...scores);
};

const partTwo = input => {
  const { players, points } = parseInput(input);
  const scores = Array(players).fill(0);

  for (let { i, score } of generateScores(points * 100)) {
    scores[i % players] += score;
  }

  return Math.max(...scores);
};

run(partOne, partTwo);
