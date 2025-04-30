
let mic;
let canvas;
let listenerImg;

function preload() {
  listenerImg = new SoundImage("assets/Images/Kenya.png");
}

function setup() {
  canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  userStartAudio();

  mic = new p5.AudioIn();
  mic.start();

  listenerImg.setMic(mic);
}

function draw() {
  background(0, 20);
  listenerImg.update(mouseX, mouseY);
  listenerImg.display();
}

// --- Class Definition ---
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
    let glow = map(this.vol, 0, 0.05, 10, 255);
    push();
    blendMode(ADD);
    tint(glow, glow, 255 - glow, 80);
    imageMode(CENTER);
    image(this.img, this.x, this.y, 50, 50);
    pop();
  }
}
