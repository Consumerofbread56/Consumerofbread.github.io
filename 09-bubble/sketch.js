// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBubbles = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for (let i = 0; i <5; i++){
    spawnBubble();
  }

  //spawn a new bubble every half second
  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(0);
  //moveBubblesRandomly();
  moveBubblesWithNoise();
  displayBubbles();
  
}

function mousePressed(){
  //did you click on the bubble?
  for (let i = theBubbles.length-1; i >= 0; i--){
    if (clickedInBubble(mouseX, mouseY, theBubbles[i])) {
      //kill it
      theBubbles.splice(i, 1);
    }
  }
}

function clickedInBubble(x, y, someBubble){
  let distanceAway = dist(x, y, someBubble.x, someBubble.y);
  if (distanceAway <= someBubble.size/2){
    return true;
  }
  else{
    return false;
  }
}

function moveBubblesWithNoise(){
  for (let bubble of theBubbles){
    //figure out where to be
    let x = noise(bubble.timeX) * width;
    let y = noise(bubble.timeY) * height;
    //set bubble objects location
    bubble.x = x;
    bubble.y = y;

    //increment timeX and timeY
    bubble.timeX += bubble.deltaTime;
    bubble.timey += bubble.deltaTime;
  }
}

function displayBubbles(){
  for (let bubble of theBubbles) {
    fill(bubble.r, bubble.g, bubble.b)
    circle(bubble.x, bubble.y, bubble.size);
  }
}

function spawnBubble(){
  let someBubble = {
    size: random(10, 30),
    x: random(width),
    y: random(height),
    speed: 3,
    r: random(0,255),
    g: random(0,255),
    b: random(0,255),
    alpha: random(0,255),
    timeX: random(0, 1000000),
    timeY: random(0, 1000000),
    deltaTime: 0.001,
  }
  theBubbles.push(someBubble)
}

function moveBubblesRandomly(){
  for (let bubble of theBubbles){
    let choice = random(100);
    if (choice < 25){
      //move up
      bubble.y -= bubble.speed;
    }
    else if (choice < 50){
      //move down
      bubble.y += bubble.speed;
    }
    else if (choice < 75){
      //move left
      bubble.x -= bubble.speed;
    }
    else {
      //move right
      bubble.x += bubble.speed;
    }
  
    
  }
}