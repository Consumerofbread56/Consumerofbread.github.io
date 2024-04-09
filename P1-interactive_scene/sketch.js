// Hit the Target - Interactive Scene
// Brayden Griffith
// 25/03/24
//
// Extra for Experts:
// - Used the "writer" method to create a .txt file with instructions on how to play the game. Lots of math too if that counts.


//States all global variables used
let gameState = 1;
let score = 0;
let x = 200;
let y = 200;
let dx = 0;
let dy = 0;
let ax;
let ay;
let radius = 20;
let oldX;
let newX;
let oldY;
let newY;
let targetX;
let targetY;
let dropStateOne = false;
let moveState = false;
let holeX;
let holeY;
let showOrigin = false;
let writer;

function setup() {
  //Creates canvas to occupy the widest possible screen
  createCanvas(windowWidth, windowHeight);
  //Code telling where the target will "spawn" (without an array, same object)
  holeX = random(radius + 30, width - radius - 30);
  holeY = random(radius + 30, height - radius - 30);
  //Tells the target not to spawn on the ball
  if (holeY <= y + radius + 50 && holeY >= y - radius - 50) {
    holeY = holeY + 50;
  }
  //Looks better
  stroke(30);
}

function draw() {
  //Gamestates: 1 = menu, 2 = game, 3 = game over screen, 4 = win screen
  if (gameState === 1) {
    background(0);
    title();
    startButton();
    hTPButton();
  } else if (gameState === 2) {
    background(220);
    drawTarget();
    drawCircle();
    sling();
    drop();
    wallCheck();
    drawScore();
  } else if (gameState === 3) {
    //Displays game over screen using two lines of text
    background(0);
    fill("white");
    textAlign(CENTER);
    textSize(14);
    text("You Lost! Please try again.", width / 2, height / 2);
    text(scoreText, width / 2, height / 2 + 20);
  } else if (gameState === 4) {
    //Super secret win screen if you have time on your hands. One line of code plus the variable scoreText, which displays how high you scored and
    background(0);
    fill("white");
    textAlign(CENTER);
    textSize(40);
    text("Okay! Stop it! You win...", width / 2, height / 2);
    text(scoreText, width / 2, height / 2 + 20);
  }
}
//Uses "for" loop to accumulate acceleration in the form of dx and dy, adding through x throughout 100 iterations. There is slightly less value throughout every iteration of d = a*i*0.0015. I originaly wanted to make a physics engine but it was a hard concept to grasp in the duration of this project. I think I could've done it if I somehow used millis() instead of i for the for loop.
function accelerate() {
  for (let i = 10; i >= 0; i -= 0.1) {
    dx = ax * i * 0.0015;
    x = dx + x;
    dy = ay * i * 0.0015;
    y = dy + y;
  }
//resets variables previously used to determine the value of ax and ay.
  newX = 0;
  newY = 0;
//go to target function for info
  target();
}
function sling() {
//checks if the mouse is pressed over the ball
  if (
    mouseIsPressed &&
    moveState === false &&
    mouseX < x + radius &&
    mouseX > x - radius &&
    mouseY < y + radius &&
    mouseY > y - radius
  ) {
//If it is, then it records the starting location of the ball using two variables. These variables are used to calculate "a"
    oldX = mouseX;
    oldY = mouseY;
//draws a circle because the if condition skips a frame when the player clicks the ball
    drawCircle();
//allows processing the next condition
    moveState = true;
  } else if (
    mouseIsPressed === true &&
    mouseX < x + radius * 1.2 &&
    mouseX > x - radius * 1.2 &&
    mouseY < y + radius * 1.2 &&
    mouseY > y - radius * 1.2 &&
    moveState === true
  ) {
//makes the ball follow the mouse while the player holds the mouse on the circle.
    x = mouseX;
    y = mouseY;
//The other variables used to calculate "a"
    newX = mouseX;
    newY = mouseY;
//Makes sure the next function (drop) doesn't bug out the game by making sure the ball is clicked by the mouse before the player lets go. Essentially does the job of the mouseReleased method but with easier to understand syntax.
    dropStateOne = true;
    //checks if ball ever goes over the target while in sling().
    target();
  //If it does, the game over screen happens.
      
  //See keyPressed() (not in the if statement, just while the player is holding the ball)
    keyPressed();
  }
}

function drop() {
  //If the mouse is released
  if (!mouseIsPressed && dropStateOne === true) {
    //Calculates "a"
    ax = newX - oldX;
    ay = newY - oldY;
    //Calls accelerate() to assess the new value of x
    accelerate();
    //Resets variables used to determine the state of the ball.
    dropStateOne = false;
    moveState = false;
  }
}

function drawCircle() {
  //draws the ball
  fill(0, 0, 200);
  circle(x, y, radius);
}

function wallCheck() {
//Checks if the ball passed the width or height of the window, or if its x and y positions have fell below zero after the drop() function. If so, loop to the other side + the distance of the ball outside of the window. (Note that you cannot hit the target by looping to the opposite side of the window, at least on your first shot. If you fall inside the target area, then you have to take another shot to increase your score).
  if (x > width) {
    x = x - width + radius;
  }
  if (x < 0) {
    x = width + x - radius;
  }
  if (y > height) {
    y = y - height + radius;
  }
  if (y < 0) {
    y = height + y - radius;
  }
}

function keyPressed() {
  //Checks if the up and down arrows are being pressed in the sling() state.
  if (keyCode === UP_ARROW && showOrigin === false) {
    //This exists because otherwise the origin indicators would permanently show when the player presses the up arrow.
    showOrigin = true;
  }
  if (keyCode === UP_ARROW && showOrigin === true){
    // if the player presses the up arrow, the origin indicators show where the ball was originally picked up using oldX and oldY
    fill(0, 0, 0);
    circle(oldX, oldY, radius / 10);
    circle(x, y, radius / 15);
    line(oldX, oldY, x, y);
  }
  if (keyCode === DOWN_ARROW) {
    //toggles origin indicators off.
    showOrigin = false;
  }
}
//
function target() {
  if (
    x >= holeX - score - 10 &&
    x <= holeX + radius + score + 50 &&
    y >= holeY - score - 10 &&
    y <= holeY + radius + score + 50
  ) {
    if (
      x >= holeX &&
      x <= holeX + radius + 30 - score &&
      y >= holeY &&
      y <= holeY + radius + 30 - score
    ) {
      holeX = random(radius + 30, width - radius - 30);
      holeY = random(radius + 30, height - radius - 50);
      if (holeY <= y + radius + 50 && holeY >= y - radius - 50) {
        holeY = holeY + 50;
        if (holeY >= width - radius - 50) {
          holeY = holeY - 300;
        }
      }
      score = score + 0.5;
    } else {
      gameState = 3;
      //console.log("skill issue");
    }
  }
}
function drawTarget() {
  fill("red");
  square(holeX - score - 10, holeY - score - 10, radius + score + 50);
  fill("white");
  square(holeX, holeY, radius + 30 - score);

  if (score === 45) {
    gameState = 4;
  }
}
function drawScore() {
  fill("black");
  textSize(14);
  scoreText = "Score: " + score * 2;
  textAlign(LEFT);
  text(scoreText, 20, 20);
}

function title() {
  fill("white");
  textAlign(CENTER);
  textSize(40);
  text("Hit the Target", width / 2, height / 2 - height / 4);
}

function startButton() {
  if (
    mouseX <= (width / 3) * 2 &&
    mouseX >= width / 3 &&
    mouseY <= height / 3 + height / 5 &&
    mouseY >= height / 3
  ) {
    fill("lightgrey");
    rect(width / 3, height / 3, width / 3, height / 5);
    fill("black");
    textSize(35);
    textAlign(CENTER);
    text("Start!", width / 2, height / 3 + height / 5 - height / 13);
    if (mouseIsPressed) {
      gameState = 2;
    }
  } else {
    fill("white");
    rect(width / 3, height / 3, width / 3, height / 5);
    fill("black");
    textSize(35);
    textAlign(CENTER);
    text("Start", width / 2, height / 3 + height / 5 - height / 13);
  }
}

function hTPButton() {
  if (
    mouseX <= (width / 3) * 2 &&
    mouseX >= width / 3 &&
    mouseY <= (height / 3) * 2 + height / 5 &&
    mouseY >= (height / 3) * 2 - height / 10
  ) {
    fill("lightgrey");
    rect(width / 3, (height / 3) * 2 - height / 10, width / 3, height / 5);
    fill("black");
    textSize(35);
    textAlign(CENTER);
    text("How 2 Play", width / 2, (height / 3) * 2 + height / 50);
  } else {
    fill("white");
    rect(width / 3, (height / 3) * 2 - height / 10, width / 3, height / 5);
    fill("black");
    textSize(35);
    textAlign(CENTER);
    text("How to Play", width / 2, (height / 3) * 2 + height / 50);
  }
}

function mousePressed() {
  if (
    gameState === 1 &&
    mouseX <= (width / 3) * 2 &&
    mouseX >= width / 3 &&
    mouseY <= (height / 3) * 2 + height / 5 &&
    mouseY >= (height / 3) * 2 - height / 10
  ) {
    writer = createWriter("instructions.txt");
    writer.write([
      "How to Play: \n \n Click and drag the ball. The ball will follow the cursor until you let go. \n The ball will travel farther the more you drag it. \n Make sure the ball doesn't touch the white boarder or you lose! \n \n Press UP and DOWN arrow keys while clicking the ball to toggle- \n view the ball's original position. \n \n Good luck!",
    ]);
    writer.close();
  }
}
