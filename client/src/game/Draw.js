import { ship_types } from './fighters';

const imgSpriteSpaceships = new Image();
imgSpriteSpaceships.src = './sprites/space_ships.png';

const imgSpriteDeathStar = new Image();
imgSpriteDeathStar.src = './sprites/death_star.png';

export function draw(context, time, users) {
  users.forEach(({ data: { spaceship, x, y, name, target } }, i) => {
    if (spaceship === ship_types.DeathStar) {
      drawDeathStar(context, x, y);
      return;
    }

    drawFighter(context, x, y, spaceship, i + time / 200);
    context.fillStyle = spaceship === ship_types.TIEFighter ? 'rgba(255,255,0,.8)' : 'rgba(255,255,255,.8)';
    context.textAlign = 'center';
    context.fillText(name, x, y - 24);
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
