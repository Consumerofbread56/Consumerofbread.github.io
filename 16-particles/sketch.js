// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const NUMBER_OF_FIREWORKS_PER_CLICK = 100;

class Particles {
  constructor(x,y) {

  }
  display(){
    noStroke();

  }
}

let fireWorks = []

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");

  for (let firework of fireWorks) {
    if (firework.isDead()){
      let index = fireWorks.indexOf(firework);
      theFireworks.splice(index, 1);
    }
    else{
      firework.update();
      firework.display();
    }
    
  }
}
