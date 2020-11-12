let background_color = "#1A232C";

let nDisplayPoints = 500;
let mainAttractor;

let robotoFont;

function preload() {
  robotoFont = loadFont('Roboto-Medium.otf');
}

function setup() {
  createCanvas(400, 350, WEBGL);
  initializeAttractor();
  textFont(robotoFont);
}

function initializeAttractor() {
  let randX = random(randomRangeX[0], randomRangeX[1]);
  let randY = random(randomRangeY[0], randomRangeY[1]);
  let randZ = random(randomRangeZ[0], randomRangeZ[1]);
  mainAttractor = new Attractor(randX, randY, randZ, dt, nDisplayPoints);
  mainAttractor.primeSystem();
}

function drawMainAttractor() {
  push();
  translate(0, -120);
  stroke(255);
  strokeWeight(1);
  noFill();
  scale(5);
  mainAttractor.addNewLorenzPoint();
  mainAttractor.draw3DPoints();
  pop();
}

function drawDescriptionText() {
  push();
  textAlign(CENTER);
  txt = "Click and drag\nto move around";
  text(txt, 0, -height / 2 + 30);
  pop();
}

function draw() {
  background(background_color);
  drawDescriptionText();
  orbitControl(1, 1, 0); // Zoom disabled
  drawMainAttractor();
}
