let backgroundColor = "#1A232C";
let nDisplayPoints = 300;

let nAttractors = 2;
let attractors = [];
let mainAttractor;
let followerAttractor;
let randomRangeX = [-15, 15];
let randomRangeY = [-18, 18];
let randomRangeZ = [14, 40];
let dt = 0.015;

let followMode = false;

function setup() {
  let canvas = createCanvas(600, 350);
  canvas.mousePressed(canvasMouseClicked);
  initializeAttractors();
}

function initializeAttractors() {
  for (let i = 0; i < nAttractors; i++) {
    let randX = random(randomRangeX[0], randomRangeX[1]);
    let randY = random(randomRangeY[0], randomRangeY[1]);
    let randZ = random(randomRangeZ[0], randomRangeZ[1]);

    attractors[i] = new Attractor(randX, randY, randZ, dt, nDisplayPoints);
    attractors[i].primeSystem();
  }
  mainAttractor = attractors[0];
}

function resetFollowers() {
  for (let i = 1; i < attractors.length; i++) {
    attractors[i].addNewRandomPoint();
    attractors[i].points.length = 1;
  }
}

function canvasMouseClicked() {
  if (followMode) {
    resetFollowers();
  }
  followMode = !followMode;
}

function drawMainAttractor() {
  push();
  if (followMode) {
    stroke(255);
    strokeWeight(0.6);
  } else {
    stroke(200);
    strokeWeight(0.5);
  }
  noFill();
  scale(3);
  mainAttractor.addNewLorenzPoint();
  mainAttractor.drawPoints();
  pop();
}

function drawFollowerAttractor(attractor) {
  let inSync = attractor.checkInSync(mainAttractor);
  push();
  if (inSync) {
    stroke(255);
    strokeWeight(0.6);
  } else {
    stroke(200);
    strokeWeight(0.5);
  }
  noFill();
  scale(3);
  attractor.drawPoints();
  pop();
}

function drawConnectingLine() {
  let lineX1 = mainAttractor.points[0].x;
  let lineZ1 = mainAttractor.points[0].z;
  let lineX2 = followerAttractor.points[0].x;
  let lineZ2 = followerAttractor.points[0].z + 57;
  if (followMode) {
    stroke(255);
    strokeWeight(0.4);
  } else {
    stroke(255);
    strokeWeight(0.2);
  }
  scale(3);
  line(lineX1, lineZ1, lineX2, lineZ2);
}

function addBackgroundTexts() {
  push();
  fill(255);
  deltaX = abs(round(followerAttractor.points[0].x, 5) - round(mainAttractor.points[0].x, 5));
  deltaY = abs(round(followerAttractor.points[0].y, 5) - round(mainAttractor.points[0].y, 5));
  deltaZ = abs(round(followerAttractor.points[0].z, 5) - round(mainAttractor.points[0].z, 5));
  text('Newest point', width - 74, height - 54);
  text('|Δ x|: ' + nf(deltaX, 2, 4), width - 77, height - 39);
  text('|Δ y|: ' + nf(deltaY, 2, 4), width - 77, height - 26);
  text('|Δ z|: ' + nf(deltaZ, 2, 4), width - 77, height - 13);

  textAlign(CENTER);
  if (!followMode) {
    txt = "Click anywhere\nto sync";
  } else {
    txt = "Click anywhere\nto reset";
  }
  text(txt, width - 45, 15);
  pop();
}

function draw() {
  background(backgroundColor);

  push();
  translate(width / 2, 0);
  drawMainAttractor();
  pop();

  push();
  translate(width / 2, 170);
  followerAttractor = attractors[1];
  followerAttractor.addNewLorenzPoint();
  if (followMode) {
    followerAttractor.points[0].x = mainAttractor.points[0].x;
  }
  drawFollowerAttractor(followerAttractor);
  pop();

  push();
  translate(width / 2, 0);
  drawConnectingLine();
  pop();

  addBackgroundTexts();
}
