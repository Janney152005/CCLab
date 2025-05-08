let mic;
let balls = [];
let vol = 0;
let listenerImg;
let mode = "chaotic";

function preload() {
  listenerImg = new SoundImage("assets/Images/bottom.jpg"); // adjust your path if needed
}

function setup() {
  createCanvas(800, 500);
  userStartAudio();

  mic = new p5.AudioIn();
  mic.start();

  listenerImg.setMic(mic);

  background(0);
}

function draw() {
  vol = mic.getLevel();
  //background(0, 20);

  if (mode === "chaotic") {
    let faceSize = map(vol, 0, 1, 30, 300); // microphone controls face scale

    // Instead of random circles, draw face illustration at random positions
    push();
    translate(random(width), random(height), vol);
    scale(faceSize / 80); // base face was ~80 wide; scale accordingly
    drawHead();
    drawHair();
    drawEars();
    drawEyes();
    drawMouth();
    pop();

    // Update and display balls following the mouse
    balls.push(new Ball(mouseX, mouseY));
    fill("white");
    for (let i = 0; i < balls.length; i++) {
      let b = balls[i];
      b.move(vol);
      b.checkOutOfCanvas();
      b.display();
    }

    for (let i = balls.length - 1; i >= 0; i--) {
      if (balls[i].isDone) {
        balls.splice(i, 1);
      }
    }

    // Display microphone-reactive image following the mouse
    listenerImg.update(mouseX, mouseY);
    listenerImg.display();

  } else if (mode === "peaceful") {
    let threshold = 0.01;  // adjust as needed (higher = more filtering)

    if (vol > threshold) {
      let circleSize = map(vol, 0, 1, 10, 100); // loud = bigger circle

      let r = random(100, 255);
      let g = random(100, 255);
      let b = random(100, 255);

      noStroke();
      fill(r, g, b, 180); // random color with some transparency
      ellipse(random(width), random(height), circleSize);
    }
  }

  // Text
  fill("orange");
  textSize(24);
  text("Faces & balls react to mic; image glows with mic input", 10, 20);
  text("Move image with cursor", 10, 40);
  text("Press SPACE to switch mode", 10, 60);
  text("Color with sound", 10, 80);
}

// --- Ball Class ---
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dia = random(10, 20);
    this.xSpd = random(-0.1, 0.1);
    this.ySpd = random(-0.1, 0.1);
    this.isDone = false;
  }
  checkOutOfCanvas() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.isDone = true;
    }
  }
  move(vol) {
    let speedFactor = map(vol, 0, 0.001, 0.001, 5); // mic controls ball speed
    this.x += this.xSpd * speedFactor;
    this.y += this.ySpd * speedFactor;
  }
  display() {
    fill(200, 200, 255, 150);
    ellipse(this.x, this.y, this.dia, this.dia);
  }
}

// --- SoundImage Class ---
class SoundImage {
  constructor(imagePath) {
    this.img = loadImage(imagePath);
    this.mic = null;
    this.vol = 0;
    this.x = width / 2;
    this.y = height / 2;
  }

  setMic(micInput) {
    this.mic = micInput;
  }

  update(x, y) {
    this.x = x;
    this.y = y;
    if (this.mic) {
      this.vol = this.mic.getLevel();
    }
  }

  display() {
    let glow = map(this.vol, 0, 0.01, 10, 255);
    push();
    blendMode(ADD);
    tint(glow, glow, 255 - glow, 80);
    imageMode(CENTER);
    image(this.img, this.x, this.y, 100, 100);
    pop();
  }
}

// --- Face Drawing Functions ---
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
  circle(0, -50, 30);
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
  circle(-9, 5, 12);
  fill(220);
  circle(-6, 3, 3);
  noFill();
  stroke(0);
  strokeWeight(2);
  arc(-10, 2, 12, 10, PI, 0);
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
  circle(11, 5, 12);
  fill(220);
  circle(15, 3, 3);
  noFill();
  stroke(0);
  strokeWeight(2);
  arc(10, 2, 12, 10, PI, 0);
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

// --- Switch Modes ---
function keyPressed() {
  if (key === ' ') {
    if (mode === "chaotic") {
      mode = "peaceful";
      background(255);
    } else {
      mode = "chaotic";
      background(0);
    }
  }
}
