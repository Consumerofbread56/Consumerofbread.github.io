// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let beat;
const SPEED = 5;
targets = []


function setup() {
  createCanvas(windowWidth, windowHeight);
  beat = millis();
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
  }
  if (millis()-1000 === beat){
    targets.pop(someCircle);
    targets.push(someCircle);
    beat = millis();
  }
  
}
  