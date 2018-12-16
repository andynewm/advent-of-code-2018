const run = require('../run');

const partOne = input => {
  const limit = Number(input);
  let elf1 = 0;
  let elf2 = 1;
  const recipes = [3, 7];

  while (recipes.length < limit + 10) {
    const toAdd = recipes[elf1] + recipes[elf2];

    if (toAdd >= 10) {
      recipes.push(1);
      recipes.push(toAdd - 10);
    } else {
      recipes.push(toAdd);
    }

    elf1 = (elf1 + recipes[elf1] + 1) % recipes.length;
    elf2 = (elf2 + recipes[elf2] + 1) % recipes.length;
  }

  return recipes.slice(limit, limit + 10).join('');
};

const partTwo = input => {
  let elf1 = 0;
  let elf2 = 1;
  const recipes = [3, 7];

  while (true) {
    const toAdd = recipes[elf1] + recipes[elf2];

    if (toAdd >= 10) {
      recipes.push(1);
      recipes.push(toAdd - 10);
    } else {
      recipes.push(toAdd);
    }

    elf1 = (elf1 + recipes[elf1] + 1) % recipes.length;
    elf2 = (elf2 + recipes[elf2] + 1) % recipes.length;

    if (
      recipes
        .slice(-input.length - 1)
        .join('')
        .includes(input)
    ) {
      return recipes
        .slice(-input.length - 1)
        .join('')
        .startsWith(input)
        ? recipes.length - input.length - 1
        : recipes.length - input.length;
    }
  }
};

run(partOne, partTwo);
