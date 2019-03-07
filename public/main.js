const canvas = document.getElementById('screen-back'),
  context = canvas.getContext('2d');

const content = document.getElementById('content');

window.addEventListener('load', start);
window.addEventListener('resize', start);

const starWars = `
    8888888888  888    88888       
   88     88   88 88   88  88      
    8888  88  88   88  88888       
      88  88 888888888 88   88     
8888888   88 88     88 88    888888

88  88  88   888    88888    888888
88  88  88  88 88   88  88  88     
88 8888 88 88   88  88888    8888  
 888  888 888888888 88   88     88 
  88  88  88     88 88    8888888  
	
	привет!
`;
function start() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
var stars = [];
var numStars = 64;
var speed = 1;
function makeStar() {
  return {
    x: Math.random(),
    y: Math.random(),
    distance: Math.sqrt(Math.random()),
    color: 'hsl(' + Math.random() * 40 + ',100%,' + (70 + Math.random() * 30) + '%)',
  };
}
for (i = 0; i < numStars; i++) {
  stars[i] = makeStar();
}

function updateStars() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (i = 0; i < numStars; i++) {
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
  requestAnimationFrame(updateStars);
}

requestAnimationFrame(updateStars);

function onChange(e) {
  const text = e.value;
  const now = new Date();
  const m = now.getMinutes();
  const time = `${now.getHours()}:${m < 10 ? '0' + m : m}`;
  if (!text) return;
  e.value = '';
  content.innerHTML += `<pre class="right">${generate(text, 30, 'right', time)}</pre>`;
  const el = document.getElementById('screen');
  el.scrollTop = Math.ceil(el.scrollHeight - el.clientHeight);
}

function generate(text, width, type, time = '') {
  return `+${'-'.repeat(text.length + 2)}+  
| ${text} |  
|${' '.repeat(text.length + 2)}|  
+${'-'.repeat(text.length + 1 - time.length)}${time}-+--`;
}
