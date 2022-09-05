const radiusX = window.innerWidth / 2
const radiusY = window.innerHeight / 2
const centerX = (window.innerWidth / 2)
const centerY = (window.innerHeight / 2)

const canvas = document.getElementById('gallery');
const ctx = canvas.getContext("2d")

const nFirstCircle = 6

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// function poisson(lambda) {
//   var L = Math.exp(-lambda);
//   var p = 1.0;
//   var k = 0;
  
//   do {
//       k++;
//       p *= Math.random();
//   } while (p > L);
  
//   return k - 1;
// }

// function getPoint(x, y, radius, angle){
//   return [x +Math.cos(angle)*radius,y+Math.sin(angle)*radius];
// }

const rdmOffset = Math.random()
const deviation = .1
const scale = 300

for (let i = 0; i < nFirstCircle; i++) {
  ctx.beginPath();
  let pos = ((rdmOffset + i / nFirstCircle + (Math.random() - .5) * deviation) % 1) * Math.PI * 2
  ctx.arc(centerX + (Math.cos(pos) * scale), centerY + (Math.sin(pos) * scale), 20, 0, 2 * Math.PI);
  ctx.stroke(); 
}

ctx.beginPath();
//ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
ctx.stroke(); 