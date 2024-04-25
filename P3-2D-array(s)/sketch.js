// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let grid;
let cellSize;
let dummy = true;

let zLevel = 32;
let oldZ = 32;
let cielingHoleLocation;
const GRID_SIZE = 30;
const PLAYER = 9;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const FLOOR_HOLE_TILE = 2;
const CIELING_HOLE_TILE = 3;

let player = {
  x: 0,
  y: 0,
};

let oldGrid = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  cellSize = height/grid.length;
}

function draw() {
  background(220);
  displayGrid();
  changeLayer(zLevel);
}

function displayGrid() {
  for (let y = 0; y<grid.length; y++){
    for (let x = 0; x<grid[2].length; x++){
      if (grid[y][x] === 1){
        fill("black");
      }
      else if (grid[y][x] === 9){
        fill("red");
      }
      else if (grid[y][x] === 2){
        fill("aqua");
      }
      else if (grid[y][x] === 3){
        fill("blue");
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
      else if (floor(random(50)) === 1 && zLevel > 0){
        emptyArray[y].push(2);
        emptyArray[y][emptyArray[y].length];
      }
      
      
      else {
        emptyArray[y].push(1);
      }
      
      
    }

  }
  emptyArray[0][0] = 9;
  player.x = 0;
  player.y = 0;
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
            else if (grid[y][x] === 9){
              dummy = -dummy;
            }
            else if (grid[y][x] === 2){
              dummy = -dummy;
            }
            else if (grid[y][x] === 3){
              dummy = -dummy;
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
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === " "){
    grid = updateGrid();
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
    if (x < GRID_SIZE && y < GRID_SIZE &&
      x >= 0 && y >= 0 && grid[y][x] === FLOOR_HOLE_TILE) {
      //previous player location
      let oldX = player.x;
      let oldY = player.y;

      //move the player
      player.x = x;
      player.y = y;

      //reset old location to be an empty tile
      grid[oldY][oldX] = OPEN_TILE;
      
      grid[player.y][player.x] = FLOOR_HOLE_TILE;
      

    
    zLevel = zLevel - 1;
    console.log(zLevel);
 }
 if (x < GRID_SIZE && y < GRID_SIZE &&
  x >= 0 && y >= 0 && grid[y][x] === CIELING_HOLE_TILE) {
  //previous player location
  let oldX = player.x;
  let oldY = player.y;

  //move the player
  player.x = x;
  player.y = y;

  //reset old location to be an empty tile
  grid[oldY][oldX] = OPEN_TILE;

  grid[player.y][player.x] = CIELING_HOLE_TILE;
  


zLevel = zLevel + 1;
console.log(zLevel);
}
}

 function changeLayer(level) {
  if (level < oldZ){
    oldGrid[oldZ] = grid;
    oldZ--;
    if (oldGrid[level] === undefined){
      grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
    }
    else {
      grid = oldGrid[level];
    }
  }
  else if (level > oldZ){
    oldGrid[oldZ] = grid;
    oldZ++;
    grid = oldGrid[level];
  }
  
 }
