//Sierpinski Triangle

let initialTriangle = [
  {x: 800, y: 20},
  {x: 100, y: 700},
  {x: 1500, y:700}
];

let theDepth = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  sierpinski(initialTriangle, theDepth);
}

function sierpinski(points, depth) {
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
  if (depth > 0){
    //lower left
    sierpinski([midpoint(points[0], points[1]), midpoint(points[1], points[2]), points[1]], depth-1);
    //upper
    sierpinski([midpoint(points[0], points[1]), midpoint(points[0], points[2]), points[0]], depth-1);
    //lower right
    sierpinski([midpoint(points[0], points[2]), midpoint(points[2], points[1]), points[2]], depth-1);
  }
}

function midpoint(point1, point2) {
  let newX = (point1.x + point2.x) / 2;
  let newY = (point1.y + point2.y) / 2;
  return {x: newX, y: newY};
}

function mousePressed() {
  theDepth++;
  if (theDepth > 10){
    theDepth = 0;
  }
}