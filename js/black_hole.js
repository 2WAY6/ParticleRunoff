var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf;

var dt = 1;
var vec_field = create_vector_field(canvas.height, canvas.width);

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


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  balls.forEach(function(ball, index) {
    ball.draw(ctx);
    let ci = Math.floor(ball.x);
    let ri = Math.floor(ball.y);

    if (ci >= canvas.width){
      ci = canvas.width - 1;
    }
    if (ci <= 0) {
      ci = 0;
    }
    if (ri >= canvas.height){
      ri = canvas.height - 1;
    }
    if (ri <= 0) {
      ri = 0;
    }

    ball.vx = vec_field[ri][ci][0];
    ball.vy = vec_field[ri][ci][1];

    // ball.x += 0.05;
    // ball.y += 0.05;
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;

    if (ball.y >= canvas.height || ball.y <= 0) {
      ball.y = Math.random() * canvas.height;
    }
    if (ball.x >= canvas.width || ball.x <= 0) {
      ball.x = Math.random() * canvas.width;
    }
  })
}

function create_vector_field(n_rows, n_cols) {
  var vector_field = [];
  let center = [Math.floor(n_cols/2), Math.floor(n_rows/2)];
  for (ri=0; ri<n_rows; ri++) {
    let vector_row = [];
    for (ci=0; ci<n_cols; ci++) {
      let dx = center[0] - ci;
      let dy = center[1] - ri;
      let r2 = dx*dx + dy*dy;

      if (r2 == 0) {
        vector_row.push([0, 0]);
      } 
      else {
        let rx = Math.round(Math.random()) ? 1 : -1;
        let ry = Math.round(Math.random()) ? 1 : -1;
        let vx = Math.random()*5 * rx;
        let vy = Math.random()*5 * ry;
        vector_row.push([vx, vy]);
      }
    }
    vector_field.push(vector_row);
  }
  console.log(vector_field[100][100]);
  return vector_field;
}

var intervalID = window.setInterval(draw, 0.01);


var balls = []
var n_balls = 10;
for (i=0; i<n_balls; i++){
  var ball = new Particle(1,
                          Math.random()*canvas.width,
                          Math.random()*canvas.height,
                          Math.random()*0,
                          Math.random()*0,
                          3 + Math.random()*3);
  balls.push(ball);
}

console.log("FINISHED 1");
// balls.forEach(item => item.draw());


console.log("FINISHED 2");