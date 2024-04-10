// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//let grid = 
// [
// [1, 0, 0, 1],
// [0, 1, 0, 1],
// [0, 0, 0, 1],
// [1, 1, 0, 0],
// [1, 0, 1, 1],
// [0, 0, 0, 1],
// [0, 0, 0, 1],
// ]
let grid;
let cellSize;
const GRID_SIZE = 10;

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