//Mode choice
const mode = "spiral"

// Auto mode
const nImgs = 30
const nCircles = 3

// Manual mode
const nImgsPerCircle = 1

// Params
const rdmOffset = Math.random()
const circleDeviation = 0
const XYDeviation = 0
const scale = 200
const circleOffset = .6


// Constants
const canvas = document.getElementById('gallery');
const ctx = canvas.getContext("2d")
const circles = calcRatio()

// Img
const imgSize = 100
let images = []

for (let i = 0; i < (mode == "manual" ? nImgsPerCircle * nCircles : nImgs); i++) {
  const img = new Image();
  img.src = `https://picsum.photos/${imgSize}/${imgSize}?random=${i}`;
  images.push(img);
}

const colors = ['green', 'red', 'blue', 'yellow', 'brown', 'purple', 'black', 'grey', 'orange']

// Functions
function drawPoint(x, y, i, size = 100) {
  ctx.beginPath();

  // Draw circles
  // ctx.arc(x, y, size, 0, 2 * Math.PI);

  // Or squares
  ctx.rect(x, y, size, size)

  // Styling
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

function fib(n) {
  const PHI = (1 + Math.sqrt(5)) / 2
  const PHI_minus = (1 - Math.sqrt(5)) / 2
  return (Math.pow(PHI, n) - Math.pow(PHI_minus, n)) / Math.sqrt(5)
}

function ellipticDrawing() {
  // Calculate canvas size
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
  const ratio = window.innerWidth / window.innerHeight

  // Draw images
  let index = 0
  for (let circle = 0; circle < nCircles; circle++) {
    let nImgsThisCircle = (mode == "auto") ? circles[circle] : nImgsPerCircle
    for (let i = 0; i < nImgsThisCircle; i++) {
      let pos = i / nImgsThisCircle

      // Adds circle deviation randomly
      pos += ((Math.random() - .5) * circleDeviation) / nImgsThisCircle
      pos += rdmOffset + circle * (1 / nImgsThisCircle / nCircles)
      pos %= 1
      pos *= Math.PI * 2
      console.log(pos)

      const x = centerX + (Math.cos(pos + Math.random() * XYDeviation) * scale * (circle * circleOffset + 1)) * ratio
      const y = centerY + (Math.sin(pos + Math.random() * XYDeviation) * scale * (circle * circleOffset + 1))

      // Draw points where images should be
      drawPoint(x, y, i, 20)

      // Draw images
      // ctx.drawImage(images[index], x - images[index].width / 2, y - images[index].height / 2)
      index++
    }
    console.log()
  }
}

function spiralDrawing() {
  // Calculate canvas size
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
  const ratio = window.innerWidth / window.innerHeight

  const nSpirals = 4
  const spiralOffset = .09
  const spacing = 1
  const startOffset = 10

  // Draw images
  let index = 0
  for (let i = startOffset; i < nImgs + startOffset; i++) {
    // let pos = i / nImgs * nSpirals

    // Adds circle deviation randomly
    // pos += ((Math.random() - .5) * circleDeviation) / nImgs
    // pos += rdmOffset + i * (1 / nImgs / nCircles)
    // pos %= 1
    // pos *= Math.PI * 2
    // console.log(pos)

    // const x = centerX + (Math.cos(pos + Math.random() * XYDeviation) * scale * (i * circleOffset + 1)) * ratio
    // const y = centerY + (Math.sin(pos + Math.random() * XYDeviation) * scale * (i * circleOffset + 1))
    let pos = i  * imgSize

    const x = centerX + Math.cos(pos) * i * 20
    const y = centerY + Math.sin(pos) * i * 20

    // Draw points where images should be
    drawPoint(x, y, i, 20)

    ctx.drawImage(images[index], x - images[index].width / 2, y - images[index].height / 2)
    index++
  }
  console.log()
}



// Draw canvas depending on size
function reDraw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Resize canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  switch (mode) {
    case "spiral":
      spiralDrawing()
      break;

    default:
      ellipticDrawing()
      break;
  }
}

window.onload = reDraw
window.onresize = reDraw