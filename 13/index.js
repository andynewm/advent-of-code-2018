const run = require('../run');

const getLocation = ({ x, y }) => `${x},${y}`;

const moveCart = cart => {
  switch (cart.direction) {
    case 'left':
      cart.x--;
      break;
    case 'right':
      cart.x++;
      break;
    case 'down':
      cart.y++;
      break;
    case 'up':
      cart.y--;
      break;
  }
};

const getMap = lines => {
  const carts = new Map();
  const map = lines.map((row, y) =>
    [...row].map((char, x) => {
      switch (char) {
        case '^':
          carts.set(getLocation({ x, y }), { direction: 'up', turns: 0, x, y });
          return null;

        case '>':
          carts.set(getLocation({ x, y }), {
            direction: 'right',
            turns: 0,
            x,
            y
          });
          return null;

        case '<':
          carts.set(getLocation({ x, y }), {
            direction: 'left',
            turns: 0,
            x,
            y
          });
          return null;

        case 'v':
          carts.set(getLocation({ x, y }), {
            direction: 'down',
            turns: 0,
            x,
            y
          });
          return null;

        case '+':
          return cart => {
            cart.direction = [
              { up: 'left', left: 'down', right: 'up', down: 'right' },
              { up: 'up', left: 'left', right: 'right', down: 'down' },
              { up: 'right', left: 'up', right: 'down', down: 'left' }
            ][cart.turns][cart.direction];
            cart.turns = (cart.turns + 1) % 3;
          };

        case '/':
          return cart => {
            cart.direction = {
              up: 'right',
              left: 'down',
              right: 'up',
              down: 'left'
            }[cart.direction];
          };

        case '\\':
          return cart => {
            cart.direction = {
              up: 'left',
              left: 'up',
              right: 'down',
              down: 'right'
            }[cart.direction];
          };
      }
    })
  );

  return { carts, map };
};

const partOne = input => {
  const lines = input.split('\n');
  const width = lines[0].length;

  const { map, carts } = getMap(lines);

  while (true) {
    for (let cart of [...carts.values()].sort(
      (a, b) => a.y * width + a.x - (b.y * width + b.x)
    )) {
      carts.delete(getLocation(cart));

      moveCart(cart);

      const location = getLocation(cart);

      if (carts.has(location)) {
        return location;
      }

      carts.set(location, cart);

      const update = map[cart.y][cart.x];
      if (update) {
        update(cart);
      }
    }
  }
};

const partTwo = input => {
  const lines = input.split('\n');
  const width = lines[0].length;

  const { map, carts } = getMap(lines);

  while (true) {
    for (let cart of [...carts.values()].sort(
      (a, b) => a.y * width + a.x - (b.y * width + b.x)
    )) {
      if (!carts.delete(getLocation(cart))) {
        continue;
      }

      moveCart(cart);

      const location = getLocation(cart);

      if (!carts.delete(location)) {
        carts.set(location, cart);
        const update = map[cart.y][cart.x];
        if (update) {
          update(cart);
        }
      }
    }

    if (carts.size === 1) {
      return [...carts.keys()][0];
    }
  }
};

run(partOne, partTwo);
