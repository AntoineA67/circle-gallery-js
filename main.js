const canvas = document.getElementById('gallery');
const ctx = canvas.getContext("2d")

const nImgsPerCircle = 1
const nCircles = 4

const rdmOffset = Math.random()
const deviation = .5
const scale = 200
const circleOffset = .6

const nImgs = 50

const mode = "auto"

const circles = calcRatio()

// Img
const imgSize = 100
let images = []

for (let i = 0; i < (mode == "auto" ? nImgs : nImgsPerCircle * nCircles); i++) {
  const img = new Image();
  img.src = `https://picsum.photos/${imgSize}/${imgSize}?random=${i}`;
  images.push(img);
}

const colors = ['green', 'red', 'blue', 'yellow', 'brown', 'purple', 'black', 'grey', 'orange']


function drawEllipse(x, y, i) {
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, 2 * Math.PI);
  ctx.fillStyle = colors[i]
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.stroke();
}

function calcRatio() {
  let n = nImgs
  let k = nCircles

  let p = n / k
  let arr = []
  for (let i = 0; i < k; i++) {
    arr.push(p)
  }

  for (let i = 0; i < k; i++) {
    for (let j = 0; j < k - i - 1; j++) {
      console.log(arr)
      let tmp = arr[i] / 3 / k
      arr[arr.length - (j + 1)] += tmp
      arr[i] -= tmp
    }
  }
  arr.forEach((v, i) => arr[i] = Math.round(v))
  return arr
}

console.log(circles)

// Draw canvas depending on size
function draw() {
  const centerX = window.outerWidth / 2
  const centerY = window.outerHeight / 2
  const ratio = window.outerWidth / window.outerHeight

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = window.outerWidth;
  canvas.height = window.outerHeight;

  let index = 0
  for (let circle = 0; circle < nCircles; circle++) {
    let nImgsThisCircle = mode == "auto" ? circles[circle] : nImgsPerCircle
    for (let i = 0; i < nImgsThisCircle; i++) {
      let pos = ((rdmOffset + circle * (1 / nImgsThisCircle / nCircles) + i / nImgsThisCircle + (Math.random() - .5) * deviation / nImgsThisCircle) % 1) * Math.PI * 2

      const x = centerX + (Math.cos(pos) * scale * (circle * circleOffset + 1)) * ratio
      const y = centerY + (Math.sin(pos) * scale * (circle * circleOffset + 1))

      drawEllipse(x, y, i)

      ctx.drawImage(images[index], x - images[index].width / 2, y - images[index].height / 2)
      index++
    }
  }

  // ctx.beginPath();
  //ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
  // ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
  // ctx.stroke();
}

window.onload = draw
window.onresize = draw