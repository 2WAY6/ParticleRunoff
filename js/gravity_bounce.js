var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf;

// var ball = {
//   x: 100,
//   y: 100,
//   vx: 5,
//   vy: 2,
//   radius: 5,
//   color: 'white',
//   draw: function() {
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
//     ctx.closePath();
//     ctx.fillStyle = this.color;
//     ctx.fill();
//   }
// };

var canvas_height = canvas.width;
var canvas_width = canvas.height;
var g = 9.81 / 100;
var dt = 0.1;

// A class describing a particle
class Particle {
  constructor(m, x, y, vx, vy, r) {
    this.m = m; // mass [kg]
    this.x = x; // x position in pixels [m]
    this.y = y; // y position in pixels [m]
    this.vx = vx; // x velocity in [m/s]
    this.vy = vy; // y velocity in [m/s]
    this.r = r; // radius in pixels [m]
    this.color = 'white'; 
  }
  // Function that draws the ball at its current location
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();    
  }
}

function draw__() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  
  balls.forEach(function(ball, index) {
    ball.draw(ctx);
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
      ball.vy = -ball.vy;
    }
    if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
      ball.vx = -ball.vx;
    }
  })
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  balls.forEach(function(ball, index) {
    ball.draw(ctx);
    ball.vy += g * dt;

    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;

    if (ball.y > canvas.height || ball.y < 0) {
      ball.vy = -ball.vy;
    }
    if (ball.x > canvas.width || ball.x < 0) {
      ball.vx = -ball.vx;
    }
  })
}

var intervalID = window.setInterval(draw, 0.5);

// canvas.addEventListener('mouseover', function(e) {
//   raf = window.requestAnimationFrame(draw);
// });

// canvas.addEventListener('mouseout', function(e) {
//   window.cancelAnimationFrame(raf);
// });

var balls = []
var n_balls = 200;
for (i=0; i<n_balls; i++){
  var ball = new Particle(1,
                          Math.random()*canvas_width,
                          Math.random()*canvas_height,
                          0,
                          Math.random(),
                          3 + Math.random()*5);
  balls.push(ball);
}

balls.forEach(item => item.draw());

console.log("FINISHED");
// create an array and a matrix
const array = [[2, 0], [-1, 3]];               // Array
const matrix = math.matrix([[7, 1], [-2, 3]]); // Matrix
console.log(matrix[0][0]);