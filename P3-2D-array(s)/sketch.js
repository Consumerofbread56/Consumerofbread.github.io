// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let grid;
let cellSize;
const GRID_SIZE = 10;
const PLAYER = 9;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
let player = {
  x: 0,
  y: 0,
};


function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  cellSize = height/grid.length;
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid() {
  for (let y = 0; y<grid.length; y++){
    for (let x = 0; x<grid[2].length; x++){
      if (grid[y][x] === 1){
        
      }
      else {
        fill("white");
      }
      square(x*cellSize,y*cellSize, cellSize);
    }
  }
}

function generateRandomGrid(rows, cols){
  let emptyArray = [];
  for (let y = 0; y < rows; y++){
    emptyArray.push([])
    for (let x = 0; x < cols; x++){
      if (random(100)< 50){
        emptyArray[y].push(0);
      }
      else {
        emptyArray[y].push(1);
      }
    }
  }
  return emptyArray;
}

function mousePressed(){
    for (let y = 0; y < grid.length; y++){
      for(let x = 0; x < grid[y].length; x++){
        if (
          mouseX > x*cellSize &&
          mouseX < x*cellSize + cellSize &&
          mouseY > y*cellSize &&
          mouseY < y*cellSize + cellSize
          ) {
            if (grid[y][x] === 1){
              grid[y].splice(x, 1, 0);
              
              
            }
            else{
              grid[y].splice(x, 1, 1);
            }
            
          }
      }
    }
 
 }

 function keyPressed(){
  if (key === "z"){
    generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "w") {   //up
    movePlayer(player.x + 0, player.y - 1); //0 on x axis, -1 on y axis
  }

  if (key === "s") {   //down
    movePlayer(player.x + 0, player.y + 1); //0 on x axis, 1 on y axis
  }

  if (key === "d") {   //right
    movePlayer(player.x + 1, player.y + 0); //1 on x axis, 0 on y axis
  }

  if (key === "a") {   //left
    movePlayer(player.x - 1, player.y + 0); //-1 on x axis, 0 on y axis
  }

}

  function movePlayer(x, y) {
    //don't move off the grid, and only move into open tiles
    if (x < GRID_SIZE && y < GRID_SIZE &&
        x >= 0 && y >= 0 && grid[y][x] === OPEN_TILE) {
        //previous player location
        let oldX = player.x;
        let oldY = player.y;
  
        //move the player
        player.x = x;
        player.y = y;
  
        //reset old location to be an empty tile
        grid[oldY][oldX] = OPEN_TILE;
  
        //move the player to the new spot
        grid[player.y][player.x] = PLAYER;
    }
 }