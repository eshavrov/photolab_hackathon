import Vector from './Vector.js';
import { draw, ship_types } from './Draw.js';

const canvas = document.getElementById('screen-back'),
  context = canvas.getContext('2d');

const content = document.getElementById('content');

window.addEventListener('load', start);
window.addEventListener('resize', start);

function start() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
start();

var stars = [];
var numStars = 64;
var speed = 5;

function makeStar() {
  return {
    x: Math.random(),
    y: Math.random(),
    distance: Math.sqrt(Math.random()),
    color: 'hsl(' + Math.random() * 40 + ',100%,' + (70 + Math.random() * 30) + '%)',
  };
}
for (let i = 0; i < numStars; i++) {
  stars[i] = makeStar();
}

function updateStars() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < numStars; i++) {
    stars[i].y -= (Math.pow(stars[i].distance, 2) / canvas.width) * speed;
    if (stars[i].y <= 0) {
      stars[i] = makeStar();
      stars[i].y = 1;
    }
    context.beginPath();
    context.arc(
      stars[i].x * canvas.width,
      stars[i].y * canvas.height,
      Math.floor(stars[i].distance * 2),
      0,
      2 * Math.PI
    );
    context.lineWidth = stars[i].distance * 4;
    context.strokeStyle = 'rgba(255,255,255,0.3)';
    context.stroke();
    context.fillStyle = stars[i].color;
    context.fill();
  }
}

function move(o, vx, vy, index) {
  o.x += vx;
  o.y += vy;
}

setInterval(() => {
  users.forEach((user, i) => {
    const rx = Math.random() < 8 ? 200 : 600 * Math.random();
    const ry = Math.random() < 8 ? 200 : 600 * Math.random();

    user.nextTarget.x = Math.abs(user.nextTarget.x + Math.random() * 2 * rx - rx);
    user.nextTarget.y = Math.abs(user.nextTarget.y + Math.random() * 2 * ry - ry);
    if (user.nextTarget.x > canvas.width) user.nextTarget.x = 2 * canvas.width - user.nextTarget.x;
    if (user.nextTarget.y > canvas.height) user.nextTarget.y = 2 * canvas.height - user.nextTarget.y;
  });
}, 200);

function dynamic() {
  users.forEach((user, i) => {
    const moveToTarget = new Vector(user.nextTarget.x - user.target.x, user.nextTarget.y - user.target.y);
    if (moveToTarget.len > 1) {
      moveToTarget.len /= 100;
      move(user.target, moveToTarget.x, moveToTarget.y, i);
    }
    const moveTo = new Vector(user.target.x - user.x, user.target.y - user.y);
    if (moveTo.len > 1) {
      moveTo.len /= 700 * (user.speed || 1);
      move(user, moveTo.x, moveTo.y, i);
    }
  });

  for (var i = 0; i < fires.length; i++) {
    var fire = fires[i];
    moveFire(fire);
    if (fire.x > canvas.width || fire.x < 0 || fire.y > canvas.height || fire.y < 0 || fire.life <= 0) {
      fires.splice(i, 1);
      i--;
      continue;
    }
  }
}

let _fire = 0;

function update(time) {
  updateStars();
  dynamic();
  _fire++;

  for (let i = 1; i < users.length; i++) {
    if (_fire % (20 + 2 * i) === 0) {
      shipFire(users[i]);
    }
  }

  draw(context, time, users);

  for (var i = 0; i < fires.length; i++) {
    drawFire(fires[i]);
  }

  requestAnimationFrame(update);
}

requestAnimationFrame(update);

function onChange(e) {
  const text = e.value;
  const now = new Date();
  const m = now.getMinutes();
  const time = `${now.getHours()}:${m < 10 ? '0' + m : m}`;
  if (!text) return;
  e.value = '';
  content.innerHTML += `<pre class="right">${generate(text, 50, 'right', time)}</pre>`;
  const el = document.getElementById('screen');
  el.scrollTop = Math.ceil(el.scrollHeight - el.clientHeight);
}
window.onChange = onChange;

function generateLines(text, max) {
  const words = text.split(' ');
  const lines = [''];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (lines[lines.length - 1].length + 1 + word.length < max) {
      lines[lines.length - 1] += ' ' + word;
    } else {
      lines.push(word);
    }
  }
  const textWidth = Math.max(...lines.map(line => line.length), 15);

  return lines.map(line => `${line}${' '.repeat(textWidth - line.length)}`);
}

function generate(text, width = 50, type, time = '') {
  const lines = generateLines(text, width);
  const textWidth = Math.max(...lines.map(line => line.length), 15);
  return `+${'-'.repeat(textWidth + 2)}+  
 ${lines.reduce(
   (acc, line) => `${acc}| ${line} |  
 `,
   ''
 )}|${' '.repeat(textWidth + 2)}|  
+${'-'.repeat(textWidth + 1 - time.length)}${time}-+--`;
}

function createUser(name, spaceship, speed) {
  const x = Math.random() * canvas.width,
    y = Math.random() * canvas.height;
  const sound = new Audio(spaceship.sound);
  sound.volume = 0.1;
  return {
    name,
    spaceship,
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed,
    target: new Vector(x, y),
    nextTarget: new Vector(x, y),
    sound,
  };
}

const users = [
  createUser('Death Star', ship_types.DeathStar, 2.1),
  createUser('Evgeniy', ship_types.TIEFighter, Math.random() + 0.1),
  createUser('Vova', ship_types.XFighter, Math.random() + 0.1),
  createUser('Daniil', ship_types.Fighter, Math.random() + 0.1),
  createUser('Luba', ship_types.TIEFighter, Math.random() + 0.1),
  createUser('Anya', ship_types.TIEFighter, Math.random() + 0.1),
  createUser('Darth Vade', ship_types.TIEFighter, Math.random() + 0.1),
  createUser('Luke Skywalker', ship_types.Fighter, Math.random() + 0.1),
  ...Array.from({ length: 3 }, (_, i) => createUser(`Bot ${i}`, ship_types.TIEFighter, Math.random() + 0.1)),
  ...Array.from({ length: 3 }, (_, i) => createUser(`Bot ${i}`, ship_types.XFighter, Math.random() + 0.1)),
];

const fires = [];

function createFire(x, y, vx, vy, f, type = 0, life = 150) {
  return {
    x,
    y,
    vx,
    vy,
    type,
    life,
    f,
  };
}

function shipFire(ship) {
  const enemies = users.filter(({ spaceship }) => spaceship.f !== ship.spaceship.f);
  let enemy;
  let max = 100000;
  enemies.forEach(v => {
    const r = Math.sqrt((v.x - ship.x) ** 2 + (v.y - ship.y) ** 2);
    if (r < max) {
      max = r;
      enemy = v;
    }
  });
  if (max < 200) {
    const { x, y } = enemy;
    const vx = (2.5 * (x - ship.x)) / max;
    const vy = (2.5 * (y - ship.y)) / max;
    fires.push(createFire(ship.x + vx * 10, ship.y + vy * 10, vx, vy, ship.spaceship.f));
    ship.sound.play();
  }
}

function drawFire(fire) {
  context.lineWidth = 1;
  context.strokeStyle = fire.f === 0 ? `rgba(255,255,255,${fire.life / 100})` : `rgba(255,0,0,${fire.life / 100})`;
  context.beginPath();
  context.moveTo(fire.x, fire.y);
  context.lineTo(fire.x - fire.vx * 7, fire.y - fire.vy * 7);
  context.stroke();
  context.closePath();
}

function moveFire(fire) {
  fire.x += fire.vx;
  fire.y += fire.vy;
  fire.life--;
}
