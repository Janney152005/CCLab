let sound;

function preload() {
  sound = loadSound("assets/beat.mp3")

}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(220);

  let volValue = map(moudeY, 0, height, 1.0, 0.0, true);
  sound.setVolume(volValue);

  let panValue = map(moudeX, 0, width, -1.0, 1.0, true);
  sound.setVolume(panValue);

  let rateValue = map(mouseY, 0, height, 2.0, 0.05, true);
  sound.setVolume(rateValue);
}

function mousePressed() {
  if (sound.isPlaying()) {
    sound.stop();
    sound.pause();
  }

  else {
    sound.loop();

  }
}
sound.play();

}