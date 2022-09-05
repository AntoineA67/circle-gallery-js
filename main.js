const canvas = document.getElementById('gallery');
const ctx = canvas.getContext("2d")

const nPerCircle = 20
const nCircles = 3

const rdmOffset = Math.random()
const deviation = .5 / nPerCircle
const scale = 300

// Img
const size = 100
let images = []

for (let i = 0; i < nPerCircle; i++) {
  const img = new Image();
  img.src = `https://picsum.photos/${size}/${size}?random=${i}`;
  images.push(img);
}

const colors = ['green', 'red', 'blue', 'yellow', 'brown', 'purple', 'black', 'grey', 'orange']


// Draw canvas depending on size
function draw() {
  const centerX = window.outerWidth / 2
  const centerY = window.outerHeight / 2
  const ratio = window.outerWidth / window.outerHeight

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width  = window.outerWidth;
  canvas.height = window.outerHeight;

  for (let circle = 0; circle < nCircles; circle++) {
    for (let i = 0; i < nPerCircle; i++) {
      let pos = ((rdmOffset + circle * (1 / nPerCircle / nCircles) + i / nPerCircle + (Math.random() - .5) * deviation) % 1) * Math.PI * 2
  
      const x = centerX + (Math.cos(pos) * scale * (circle * .3 + 1)) * ratio
      const y = centerY + (Math.sin(pos) * scale * (circle * .3 + 1))
  
      ctx.beginPath();
      ctx.strokeStyle = 0xffffff / nPerCircle * i;
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = colors[i]
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.stroke();

      // ctx.drawImage(images[i], x - images[i].width / 2, y - images[i].height / 2)
    }
  }
  
  // ctx.beginPath();
  //ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
  // ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
  // ctx.stroke();
}

window.onload = draw
window.onresize = draw