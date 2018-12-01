exports.partOne = input =>
  input
    .split('\n')
    .map(Number)
    .reduce((total, n) => total + n);
