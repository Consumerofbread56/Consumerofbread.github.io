// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//let grid = 
// [
// [0, 0, 0, 1],
// [0, 1, 0, 1],
// [0, 0, 0, 1],
// [1, 1, 0, 0],
// [1, 0, 1, 1],
// [0, 0, 0, 1],
// [0, 0, 0, 1],
// ]
let grid;
let cellSize;
let gosper;

const GRID_SIZE = 50;

function preload() {
  gosper = {
    gun: loadJSON("gosper.json"),
  }
}

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
        fill ("black");
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

function generateEmptyGrid(rows, cols){
  let emptyArray = [];
  for (let y = 0; y < rows; y++){
    emptyArray.push([])
    for (let x = 0; x < cols; x++){
      
      emptyArray[y].push(0);
      
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
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === " "){
    grid = updateGrid();
  }
  if (key === "e"){
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "g"){
    grid = gosper.gun;
  }
 }

 function updateGrid(){
  let nextTurn = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  for (let x=0; x < GRID_SIZE; x++){
    for (let y=0; y < GRID_SIZE; y++){
      let neighbors = 0;

      //look bro
      for(let i = -1; i<= 1; i++){
        for(let j = -1; j<= 1; j++){
          //avoid edge of grid
          let neighborY = y+j;
          let neighborX = x+i;
          if (neighborX >= 0 && neighborX < GRID_SIZE && neighborY >= 0 && neighborY < GRID_SIZE) {
            neighbors += grid[neighborY][neighborX];
          }
          
        }
       
      }

      neighbors -= grid[y][x];

      // apply rules
      if (grid[y][x] === 1) {
       
        if (neighbors === 2 || neighbors === 3){
          nextTurn[y][x] = 1;
        }
        else{
          nextTurn[y][x] = 0;
        }
        
      }
      if (grid[y][x] === 0){
        if(neighbors === 3){
          nextTurn[y][x] = 1;
        }
        else{
          nextTurn[y][x] = 0;
        }
      }
    }
  }
  return nextTurn;
 }