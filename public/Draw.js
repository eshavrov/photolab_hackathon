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

const imgSpriteSpaceships = new Image();
imgSpriteSpaceships.src = './sprites/space_ships.png';
const imgSpriteDeathStar = new Image();
imgSpriteDeathStar.src = './sprites/death_star.png';

export function draw(context, time, users) {
  users.forEach(({ spaceship, x, y, name, target }, i) => {
    if (spaceship === ship_types.DeathStar) {
      drawDeathStar(context, x, y);
      return;
    }

    drawFighter(context, x, y, spaceship, i + time / 200);
    context.fillStyle = spaceship === ship_types.TIEFighter ? 'rgba(255,255,0,.3)' : 'rgba(255,255,255,.3)';
    context.fillText(name, x, y);
  });
}

function drawFighter(context, x, y, { frames, spanX, spanY }, iframe) {
  iframe = iframe % frames.length << 0;
  const frame = frames[iframe];
  context.drawImage(imgSpriteSpaceships, frame[0] * 40, frame[1] * 40, 40, 40, x - 20, y - 20, 40, 40);
}

function drawDeathStar(context, x, y) {
  context.drawImage(imgSpriteDeathStar, x - 128, y - 128);
}
