const getDifferingIndex = (a, b) => {
  if (a.length != b.length) {
    return null;
  }

  let match;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      if (match !== undefined) {
        return null;
      }

      match = i;
    }
  }

  return match;
};

exports.partTwo = input => {
  const strings = input.split('\n').filter(x => x);

  for (let i = 0; i < strings.length; i++) {
    for (let j = i + 1; j < strings.length; j++) {
      const a = strings[i];
      const b = strings[j];

      const differingIndex = getDifferingIndex(a, b);

      if (differingIndex !== null) {
        return a.slice(0, differingIndex) + a.slice(differingIndex + 1);
      }
    }
  }
};
