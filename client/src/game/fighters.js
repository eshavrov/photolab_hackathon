import Vector from './Vector.js';

function createFighter(name, spaceship, speed, canvas = { width: 100, height: 100 }) {
  const x = Math.random() * canvas.width,
    y = Math.random() * canvas.height;
  // const sound = new Audio(spaceship.sound);
  // sound.volume = 0.1;
  return {
    name,
    spaceship,
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed,
    target: new Vector(x, y),
    nextTarget: new Vector(x, y),
    // sound,
  };
}

class Fighters {
  constructor() {
    this._list = [];
  }

  add(key, { name, spaceship }) {
    const speed = spaceship === ship_types.DeathStar ? 2.1 : Math.random() + 0.1;

    this._list.push({
      key,
      data: createFighter(name, spaceship, speed),
    });
  }
  get list() {
    return this._list;
  }
}

export const fighters = new Fighters();

export const ship_types = {
  XFighter: {
    spanX: 20,
    spanY: 20,
    f: 0,
    sound: 'http://www.dribbleglass.com/Sounds/blaster.wav',
    frames: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 1],
      [8, 1],
    ],
  },
  TIEFighter: {
    spanX: 20,
    spanY: 20,
    f: 1,
    sound: 'http://www.threecaster.com/wavy/rebel_laser_ship.wav',

    frames: [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4]],
  },
  Fighter: {
    spanX: 20,
    spanY: 20,
    f: 0,
    sound: 'http://www.caselab.okstate.edu/cole/wavs/SHOT2.WAV',
    frames: [
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 2],
      [5, 2],
      [6, 2],
      [7, 2],
      [8, 2],
      [0, 3],
      [1, 3],
      [2, 3],
      [3, 3],
      [4, 3],
      [5, 3],
      [6, 3],
      [7, 3],
      [8, 3],
      [9, 3],
    ],
  },
  DeathStar: {
    spanX: 128,
    spanY: 128,
    f: 1,
  },
};
//[
// createUser('Death Star', ship_types.DeathStar, 2.1),
// createUser('Evgeniy', ship_types.TIEFighter, Math.random() + 0.1),
// createUser('Vova', ship_types.XFighter, Math.random() + 0.1),
// createUser('Daniil', ship_types.Fighter, Math.random() + 0.1),
// createUser('Luba', ship_types.TIEFighter, Math.random() + 0.1),
// createUser('Anya', ship_types.TIEFighter, Math.random() + 0.1),
// createUser('Darth Vade', ship_types.TIEFighter, Math.random() + 0.1),
// createUser('Luke Skywalker', ship_types.Fighter, Math.random() + 0.1),
// ...Array.from({ length: 3 }, (_, i) => createUser(`Bot ${i}`, ship_types.TIEFighter, Math.random() + 0.1)),
// ...Array.from({ length: 3 }, (_, i) => createUser(`Bot ${i}`, ship_types.XFighter, Math.random() + 0.1)),
// ];
