function* repeat(array) {
  while (true) yield* array;
}

exports.partTwo = input => {
  const set = new Set();
  let frequency = 0;

  for (let n of repeat(
    input
      .split('\n')
      .filter(x => x)
      .map(Number)
  )) {
    set.add(frequency);
    frequency += n;

    if (set.has(frequency)) {
      return frequency;
    }
  }
};
