// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let somePoint = new MovingPoint(width/2, height/2);
  points.push(somePoint);
}

function draw() {
  background(220);
  
  for (let point of points) {
    point.update();
    point.display();
  }
}

class MovingPoint {
  constructor(x, y) {
    this.speed = 5;
    this.radius = 15;
    this.x = x;
    this.y = y;
    this.xTime = random(0, 1000);
    this.yTime = random(0, 1000);
    this.deltaTime = 0.01;
    this.color = color(random(255),random(255),random(255));
  }
  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }
  update() {
    //pick random direction of movement
    let dx = noise(this.xTime)*width;
    let dy = noise(this.yTime)*height;

    //scale speed
    this.dx = map(dx, 0, 1, -this.speed, +this.speed);
    this.dy = map(dy, 0, 1, -this.speed, +this.speed);


    // this.x = noise(this.xTime)*width;
    // this.y = noise(this.yTime)*height;

    //move around
    this.xTime = this.xTime + dx;
    this.yTime = this.yTime + dy;
  }
}

function mousePressed() {
  let somePoint = new MovingPoint(mouseX, mouseY);
  points.push(somePoint);
}