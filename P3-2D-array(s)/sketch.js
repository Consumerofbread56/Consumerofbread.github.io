// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"




let grid;
let cellSize;
let blockSelected;
let dummy = true;
let zLevel = 32;
let oldZ = 32;


//inventory
let stoneCollected = 0;
let logsCollected = 0;
let porkCollected = 0;
let porkchopCollected = 0;
let burntFleshCollected = 0;
let fleshCollected = 0;
let ironOreCollected = 0;
let ironCollected = 0;
let goldOreCollected = 0;
let goldCollected = 0;
let adamantiumOreCollected = 0;
let adamantiumCollected = 0;
let coalCollected = 0;
let workshopsCollected = 0;
let doorsCollected = 0;
let spikesCollected = 0;
let woodenSwordCollected = 0;
let woodenPickaxeCollected = 0;
let stoneSwordCollected = 0;
let stonePickaxeCollected = 0;
let ironPickaxeCollected = 0;
let ironSwordCollected = 0;
let ironArmorCollected = 0;
let adamantiumPickaxeCollected = 0;
let adamantiumSwordCollected = 0;
let adamantiumArmorCollected = 0;
let amuletCollected = 0;
let crucibleCollected = 0;




let oldCielingHoleLocationX = [];
let oldCielingHoleLocationY = [];
let newCielingHoleLocationX = [];
let newCielingHoleLocationY = [];
let oldGrid = [];


const GRID_SIZE = 30;
const PLAYER = 9;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const FLOOR_HOLE_TILE = 2;
const CIELING_HOLE_TILE = 3;
const PLANK = 4;
const TREE = 5;
const PIG = 6;
const ONI = 7;
const GOBLIN = 8;
const IRON = 10;
const GOLD = 11;
const ADAM = 12;
const COAL = 13;
const WORKSHOP = 14;
const DOOR = 15;
const LAVA = 16;
const SPIKES = 17;
const TREE_SR = 2;
const PIG_SR = 30;
const GOBLIN_SR = 20;
const ONI_SR = 50;


let player = {
  x: 0,
  y: 0,
};
let pig = {
  x: 0,
  y: 0,
  healthPoints: 7,
  strength: 0
}
let goblin = {
  x: 0,
  y: 0,
  healthPoints: 20,
  strength: 2
}
let oni = {
  x: 0,
  y: 0,
  healthPoints: 100,
  strength: 10,
  necrosingStrength: 2
}








function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  cellSize = height/grid.length;
  noStroke();
}


function draw() {
  background(220);
  displayGrid();
  displayInventory();
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
        fill("gray");
      }
      else if (grid[y][x] === 3){
        fill("silver");
      }
      else if (grid[y][x] === 4){
        fill("lime");
      }
      else if (grid[y][x] === LAVA){
        fill("maroon");
      }
      else if (grid[y][x] === PLANK){
        fill("brown");
      }
      else {
        if (oldZ === 32){
          fill("green");
        }
        else{
          fill("white");
        }
       
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
      for(let i = 0; i< cols; i++){
        if (oldCielingHoleLocationX[i] === x && oldCielingHoleLocationY[i] === y){
          emptyArray[y].push(3);
        }
      }
   
        if (random(100)< 50 && oldZ < 32){
            emptyArray[y].push(1);
          }
       
        else if (floor(random(75)) === 1 && zLevel > 0){
          emptyArray[y].push(2);
          newCielingHoleLocationX.push(emptyArray[y].length-1);
          newCielingHoleLocationY.push(emptyArray.length-1);
        }
        else if (oldZ === 32 && floor(random(75)) === 1) {
          emptyArray[y].push(TREE);
        }
        else if (oldZ < 20 && floor(random(100)) < 10+(20-oldZ)) {
          emptyArray[y].push(LAVA);
        }
       
       
        else {
            emptyArray[y].push(0);
         
        }
     


     
     
    }


  }
 if (grid === undefined){
  emptyArray[0][0] = 9;
 }
 
  oldCielingHoleLocationX = newCielingHoleLocationX;
  oldCielingHoleLocationY = newCielingHoleLocationY;
  newCielingHoleLocationX = [];
  newCielingHoleLocationY = [];


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
              stoneCollected++;
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
            else if (grid[y][x] === 0){
              if (blockSelected != undefined){
                if(blockSelected === 1 && stoneCollected>0){
                  grid[y].splice(x, 1, IMPASSIBLE);
                  stoneCollected--;
                }
               
              }
             
            }
           
          }
      }
    }
    if (mouseX>width-width/2 && mouseX<width-width/2+50){
      for (let y = 0; y<height; y++){
        if(mouseY === y){
          let slot = Math.floor(y/10);
          if (slot === 0){
            blockSelected = IMPASSIBLE;
          }
          else if (slot === 1){
            blockSelected = PLANK;
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
        if (grid[oldY][oldX] === CIELING_HOLE_TILE){
          grid[oldY][oldX] = CIELING_HOLE_TILE;
        }
        else if (grid[oldY][oldX] === FLOOR_HOLE_TILE){
          grid[oldY][oldX] = FLOOR_HOLE_TILE;
        }
        else {
          grid[oldY][oldX] = OPEN_TILE;
        }
       
 
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


 function displayInventory() {
  stroke(30)
  fill("white");
  rect(width-width/2, 0, 50, 10);
  rect(width-width/2, 10, 50, 10);
  fill("black");
  text("Stone: "+stoneCollected, width-width/2, 10);
  text("Planks: "+logsCollected, width-width/2, 20);


 }

