// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let beat = 0;
const SPEED = 5;
targets = []


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  spawnCircles();
  drawCircle();
}

function drawCircle(){
  
  circle(targets[0].x, targets[0].y, targets[0].radius);
}

function spawnCircles(){
  someCircle = {
    x: random(width),
    y: random(height),
    speed: SPEED,
    radius: 10
  };
  if (millis() > beat+2000){
    targets.pop(0);
    targets.push(someCircle);
    beat = millis();
  }
  if (millis() < 1000){
    targets.push(someCircle);
  }
  
}
  