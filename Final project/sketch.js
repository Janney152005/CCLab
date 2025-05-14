let seq = 0;
let img;
let audio;

let baby;
let angle = 0;
let angleVel = 0.005;
let radius = 150;
let x = 0;
let y = 0;


let colorChangeThreshold = 0.05;
let mic;
let bgColor;
let targetColor;
let quietColor;
let lastVol = 0;

let balls = [];

function preload() {
  img = loadImage("assets/baby.png");
  audio = loadSound("assets/Jane_soundproject_mixdown.mp3");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  background(0);
  noCursor();

  baby = new babyWithClock(width / 2, height / 2);
  mic = new p5.AudioIn();
  mic.start();

  quietColor = color(0);
  targetColor = color(255, 0, 0);
  bgColor = quietColor;

  for (let i = 0; i < 10; i++) {
    balls.push({
      x: random(width),
      y: random(500, 0),
      size: random(20, 40),
      speed: random(1, 3),
      color: color(random(255), random(255), random(255)),
      swayAmplitude: random(5, 20),
      swaySpeed: random(0.01, 0.03),
      phase: random(TWO_PI)
    });
  }

  audio.loop();
}


function draw() {
  switch (seq) {
    case 0:
      drawIntro();
      break;
    case 1:
      drawScene1();
      break;
    case 2:
      drawScene2();
      break;
    case 3:
      drawScene3();
      break;
    case 4:
      drawBlankScene();
      break;
  }

  fill(255);
  textSize(16);
  text("Sequence: " + seq, 10, 20);
  text("Click to move to next phase.", 10, 50);
}

function mousePressed() {
  proceedSequence();
}

function proceedSequence() {
  seq++;
  if (seq === 5) {
    seq = 0;
    baby = new babyWithClock(width / 2, height / 2);
  }
}

// Scene 0
function drawIntro() {
  push();
  blendMode(ADD);
  tint(220, 120, 10, 40);
  imageMode(CENTER);
  image(img, mouseX, mouseY, 100, 100);
  pop();
}

// Scene 1
function drawScene1() {
  background(0);

  if (baby.alive) {
    baby.update();
    baby.display();
  } else {
    let pct = 0.1;
    x = lerp(x, mouseX, pct);
    y = lerp(y, mouseY, pct);
    angle += angleVel;

    for (let i = 0; i < 5; i++) {
      let targetX = width / 2 + cos(angle + TWO_PI * i / 5) * radius;
      let targetY = height / 2 + sin(angle + TWO_PI * i / 5) * radius;
      let lerpedX = lerp(targetX, x, pct);
      let lerpedY = lerp(targetY, y, pct);
      drawBaby(lerpedX, lerpedY);
    }
  }
}

// Scene 2
function drawScene2() {
  let vol = mic.getLevel();
  let smoothVol = lerp(lastVol, vol, 0.1);
  lastVol = smoothVol;

  if (smoothVol > colorChangeThreshold) {
    targetColor = color(random(150, 255), random(150), random(0, 150));
  }

  let amt = constrain(map(smoothVol, 0, 0.1, 0, 1), 0, 1);
  bgColor = lerpColor(quietColor, targetColor, amt);

  noStroke();
  fill(bgColor);
  rect(0, 0, width, height);

  let pct = 0.1;
  x = lerp(x, mouseX, pct);
  y = lerp(y, mouseY, pct);
  angle += angleVel;

  for (let i = 0; i < 5; i++) {
    let targetX = width / 2 + cos(angle + TWO_PI * i / 5) * radius;
    let targetY = height / 2 + sin(angle + TWO_PI * i / 5) * radius;
    let lerpedX = lerp(targetX, x, pct);
    let lerpedY = lerp(targetY, y, pct);
    drawBaby(lerpedX, lerpedY);
  }
}

// Scene 3
function drawScene3() {
  background(0);

  // balls
  for (let ball of balls) {
    //ball position
    ball.y -= ball.speed;
    ball.x += sin(ball.phase) * ball.swayAmplitude;

    fill(ball.color);
    noStroke();
    ellipse(ball.x, ball.y, ball.size);
    if (ball.y < 300) {
      ball.y = height;
      ball.x = random(width);
    }
  }

  fill("red");
  textSize(20);
  textFont("Arial");
  text("Thank You for exploring a baby's experience!", 500, 150);
  fill("blue");
  text("Sequence 0: She loves coloring.", 50, 200);
  fill("white");
  text("Instruction 0: Use her portrait to color the dark canvas, just as she would. ", 70, 240);
  fill("blue");
  text("Sequence 1: Watch her moods shift, her attention wander and she slips into a game.", 50, 320);
  fill("white");
  text("Instruction 1: You can move the group of babies around the canvas using your mouse.", 70, 360);
  fill("blue");
  text("Sequence 2: Even when the world becomes chaotic and noisy, she keeps playing.", 50, 440);
  fill("white");
  text("Instruction 2: Make noise and see the background color change, you can still move the group with mouse.", 70, 480);
  fill("red");
  textSize(15);
  text("The entire journey was surrounded by everyday sounds- boiling water, blow dryers, plastic bags, footsteps, keycode beeping, etc. - fragments of domestic life, the sound she grew up with.", 10, 580);
  fill("white");
  text("Click to return to the begining !", 550, 600);

}

// scene 4
function drawBlankScene() {
  background(0);
}


class babyWithClock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.clock = 0;
    this.lifetime = random(1000, 1200);
    this.alive = true;
    this.eyeOffset = 0;
  }

  update() {
    let shakeExtent = map(this.clock, 0, this.lifetime, 0, 5);
    this.x += random(-shakeExtent, shakeExtent);
    this.y += random(-shakeExtent, shakeExtent);

    this.eyeOffset = sin(frameCount * 0.05) * 3;

    this.clock++;

    if (this.clock >= this.lifetime) {
      this.alive = false;
    }
  }

  display() {
    if (this.clock < this.lifetime * 0.25) {
      fill(0, 255, 208);
    } else if (this.clock < this.lifetime * 0.5) {
      fill(85, 230, 203);
    } else if (this.clock < this.lifetime * 0.75) {
      fill(161, 227, 215);
    } else {
      fill(230, 255, 250);
    }

    this.drawHead();
    this.drawHair();
    this.drawEars();
    this.drawEyes();
    this.drawMouth();
  }

  drawHead() {
    fill(150, 55, 35);
    stroke(0);
    strokeWeight(1.5);
    circle(this.x, this.y, 80);
  }

  drawHair() {
    fill(0);
    noStroke();
    arc(this.x, this.y - 15, 70, 60, PI, 0);
    fill(150, 55, 35);
    circle(this.x - 35, this.y - 15, 3);
    circle(this.x - 25, this.y - 17, 5);
    circle(this.x - 15, this.y - 17, 5);
    circle(this.x - 5, this.y - 17, 5);
    circle(this.x + 5, this.y - 17, 5);
    circle(this.x + 15, this.y - 17, 5);
    circle(this.x + 25, this.y - 17, 5);
    circle(this.x + 33, this.y - 15, 3);
    fill(0);
    circle(this.x, this.y - 50, 30); // Bun
  }

  drawEars() {
    fill(150, 55, 35);
    stroke(0);
    strokeWeight(1.5);
    arc(this.x + 40, this.y, 20, 20, 3 * PI / 2, PI / 2); // Right ear
    arc(this.x - 40, this.y, 20, 20, PI / 2, 3 * PI / 2); // Left ear
  }

  drawEyes() {
    fill(220);
    noStroke();
    circle(this.x - 10, this.y + 5, 15); // Left eye white
    fill(0);
    noStroke();
    circle(this.x - 9 + this.eyeOffset, this.y + 5, 6); // Left eyeball
    fill(220);
    noStroke();
    circle(this.x - 7 + this.eyeOffset, this.y + 3, 2); // Left highlight
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(this.x - 10, this.y + 2, 12, 10, PI, 0); // Left eyelashes
    line(this.x - 17, this.y + 2, this.x - 20, this.y + 3);
    line(this.x - 17, this.y + 3, this.x - 20, this.y + 4);
    fill(0);
    noStroke();
    arc(this.x - 10, this.y - 7, 15, 5, PI, 0); // Left eyebrow
    stroke(0);
    strokeWeight(2);
    line(this.x - 14, this.y - 8, this.x - 20, this.y - 6);

    fill(220);
    noStroke();
    circle(this.x + 10, this.y + 5, 15); // Right eye white
    fill(0);
    noStroke();
    circle(this.x + 11 + this.eyeOffset, this.y + 5, 6); // Right eyeball
    fill(220);
    noStroke();
    circle(this.x + 13 + this.eyeOffset, this.y + 3, 2); // Right highlight
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(this.x + 10, this.y + 2, 12, 10, PI, 0); // Right eyelashes
    line(this.x + 17, this.y + 3, this.x + 20, this.y + 2);
    line(this.x + 17, this.y + 4, this.x + 20, this.y + 3);
    fill(0);
    noStroke();
    arc(this.x + 10, this.y - 7, 15, 5, PI, 0); // Right eyebrow
    stroke(0);
    strokeWeight(2);
    line(this.x + 14, this.y - 8, this.x + 20, this.y - 6);
  }

  drawMouth() {
    noFill();
    stroke(0);
    strokeWeight(1);
    arc(this.x, this.y + 17, 15, 5, 0, PI); // Upper lip
    noFill();
    stroke(0);
    strokeWeight(1.5);
    arc(this.x, this.y + 22, 25, 15, 0, PI); // Lower lip
    line(this.x - 8, this.y + 17, this.x - 13, this.y + 22);
    line(this.x + 8, this.y + 17, this.x + 13, this.y + 22);
    fill(220);
    noStroke();
    arc(this.x, this.y + 20, 10, 5, 0, PI); // Teeth
    fill(255, 0, 0);
    noStroke();
    arc(this.x, this.y + 27, 15, 10, PI, 0); // Tongue
    arc(this.x, this.y + 27, 12, 5, 0, PI); // Tongue
  }
}



function drawBaby(x, y) {
  push();
  translate(x, y);
  rotate(radians(angle));

  drawHead();
  drawHair();
  drawEars();
  drawEyes();
  drawMouth();

  pop();
}

// Reuse of the drawing functions for the baby
function drawHead() {
  fill(150, 55, 35);
  stroke(0);
  strokeWeight(1.5);
  circle(0, 0, 80);
}

function drawHair() {
  fill(0);
  noStroke();
  arc(0, -15, 70, 60, PI, 0);

  fill(150, 55, 35);
  circle(-35, -15, 3);
  circle(-25, -17, 5);
  circle(-15, -17, 5);
  circle(-5, -17, 5);
  circle(5, -17, 5);
  circle(15, -17, 5);
  circle(25, -17, 5);
  circle(33, -15, 3);

  fill(0);
  circle(0, -50, 30); // Bun to rotate with the head
}

function drawEars() {
  fill(150, 55, 35);
  stroke(0);
  strokeWeight(1.5);
  arc(40, 0, 20, 20, 3 * PI / 2, PI / 2);
  arc(-40, 0, 20, 20, PI / 2, 3 * PI / 2);
}

function drawEyes() {
  fill(220);
  noStroke();
  circle(-10, 5, 15);
  fill(0);
  noStroke();
  circle(-9, 5, 12);
  fill(220);
  noStroke();
  circle(-6, 3, 3);
  noFill();
  stroke(0);
  strokeWeight(2);
  arc(-10, 2, 12, 10, PI, 0);
  noFill();
  stroke(0);
  strokeWeight(2);
  line(-17, 2, -20, 3);
  line(-17, 3, -20, 4);
  fill(0);
  noStroke();
  arc(-10, -7, 15, 5, PI, 0);
  noFill();
  stroke(0);
  strokeWeight(2);
  line(-14, -8, -20, -6);

  fill(220);
  noStroke();
  circle(10, 5, 15);
  fill(0);
  noStroke();
  circle(11, 5, 12);
  fill(220);
  noStroke();
  circle(15, 3, 3);
  noFill();
  stroke(0);
  strokeWeight(2);
  arc(10, 2, 12, 10, PI, 0);
  noFill();
  stroke(0);
  strokeWeight(2);
  line(17, 3, 20, 2);
  line(17, 4, 20, 3);
  fill(0);
  noStroke();
  arc(10, -7, 15, 5, PI, 0);
  noFill();
  stroke(0);
  strokeWeight(2);
  line(14, -8, 20, -6);
}

function drawMouth() {
  noFill();
  stroke(0);
  strokeWeight(1);
  arc(0, 17, 15, 5, 0, PI);
  noFill();
  stroke(0);
  strokeWeight(1.5);
  arc(0, 22, 25, 15, 0, PI);
  line(-8, 17, -13, 22);
  line(8, 17, 13, 22);
  fill(220);
  noStroke();
  arc(0, 20, 10, 5, 0, PI);
  fill(255, 0, 0);
  noStroke();
  arc(0, 27, 15, 10, PI, 0);
  arc(0, 27, 12, 5, 0, PI);
}
