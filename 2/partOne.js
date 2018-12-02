const getLetterDistributions = string =>
  Object.values(
    [...string].reduce((obj, x) => {
      obj[x] = (obj[x] || 0) + 1;
      return obj;
    }, {})
  );

exports.partOne = input => {
  const letterCounts = input
    .split('\n')
    .filter(x => x)
    .map(getLetterDistributions);

  const doubleLetters = letterCounts.filter(x => x.includes(2)).length;
  const tripleLetters = letterCounts.filter(x => x.includes(3)).length;

  return doubleLetters * tripleLetters;
};
