import utils, { randomIntFromRange } from './utils'
import { randomColor } from './utils'
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#267365', '#F2CB05', '#F29F05', '#F28705','#F23030']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = Math.random()* Math.PI*2;
    this.velocity = 0.05;
    this.distanceFromCenter = randomIntFromRange(40,300)
    this.lastMouse = { x: x, y : y};
  }

  draw(lastPoint) {
    c.beginPath()
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath()
  }

  update(x,y){
    const lastPoint = {
      x: this.x , y:this.y
    }
  // Move points over time
    this.radians += this.velocity;

  // Drag Effect
   this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
   this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

   // Circular Motion
    this.x = this.lastMouse.x + Math.cos(this.radians)* this.distanceFromCenter;
    this.y = this.lastMouse.y + Math.sin(this.radians)* this.distanceFromCenter;
    // console.log(Math.cos(this.radians));
    this.draw(lastPoint)
  }
}

// Implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < 200; i++) {
    const radius = (Math.random()* 4) +2;
    particles.push(new Particle(canvas.width/2 ,canvas.height/2, radius, randomColor(colors)));
  }
  console.log(particles);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0,0,0, 0.05)';
  c.fillRect(0, 0, canvas.width, canvas.height);

  
  particles.forEach(particle => {
   particle.update(canvas.width/2, canvas.height/2)
  })
}

init()
animate()
