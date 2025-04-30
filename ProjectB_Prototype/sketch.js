let quiz;
let translations = {};
let sounds = {};
let bgImage;
//let loading = true;


function preload() {
  bgImage = loadImage("assets/Images/Kenya.png");

  translations = {
    1: "moja", 2: "mbili", 3: "tatu", 4: "nne", 5: "tano",
    6: "sita", 7: "saba", 8: "nane", 9: "tisa", 10: "kumi"
  };

  for (let i = 1; i <= 10; i++) {
    sounds[i] = loadSound(`assets/swahili/${translations[i]}.wav`);
  }
}

function setup() {
  let canvas = createCanvas(600, 500);
  canvas.parent("p5-canvas-container");
  textAlign(CENTER, CENTER);
  textSize(32);

  quiz = new SwahiliQuiz(translations, sounds);
  quiz.askNextQuestion();
}


function draw() {
  background(245);
  quiz.display();
  image(bgImage, 5, 5, 80, 50);
}

function mousePressed() {
  quiz.handleClick(mouseX, mouseY);
}

class SwahiliQuiz {
  constructor(translations, sounds) {
    this.translations = translations;
    this.sounds = sounds;
    this.score = 0;
    this.count = 0;
    this.maxQuestions = 10;
    this.gameOver = false;
    this.feedback = "";
    this.options = [];
    this.correctWord = "";
    this.currentNumber = null;
    this.timer = 0;
  }

  askNextQuestion() {
    this.currentNumber = floor(random(1, 11));
    this.correctWord = this.translations[this.currentNumber];
    this.options = this._generateOptions(this.currentNumber);
    this.feedback = "";
    this.timer = 0;

    this.sounds[this.currentNumber].play();
  }

  _generateOptions(correctNum) {
    let choices = [this.translations[correctNum]];
    let pool = [];

    for (let i = 1; i <= 10; i++) {
      if (i !== correctNum) pool.push(this.translations[i]);
    }

    shuffle(pool);
    while (choices.length < 4) {
      choices.push(pool.pop());
    }

    return shuffle(choices);
  }

  display() {
    if (this.gameOver) {
      fill(30);
      textSize(40);
      text("🎉 Quiz Complete! 🎉", width / 2, height / 2 - 40);
      textSize(32);
      text(`Score: ${this.score} / ${this.maxQuestions}`, width / 2, height / 2 + 10);
      return;
    }

    fill(0);
    textSize(28);
    text("Swahili Numbers", width / 2, 30);
    textSize(64);
    text(this.currentNumber, width / 2, 100);

    textSize(28);
    for (let i = 0; i < this.options.length; i++) {
      fill(200);
      rect(100, 160 + i * 60, 400, 50, 10);
      fill(0);
      text(this.options[i], 300, 185 + i * 60);
    }

    fill(this.feedback === "Correct!" ? "green" : "red");
    textSize(24);
    text(this.feedback, width / 2, height - 40);

    if (this.timer > 0 && millis() > this.timer) {
      this.timer = 0;
      if (this.count < this.maxQuestions) {
        this.askNextQuestion();
      } else {
        this.gameOver = true;
      }
    }
  }

  handleClick(mx, my) {
    if (this.gameOver || this.timer > 0) return;

    for (let i = 0; i < this.options.length; i++) {
      let x = 100, y = 160 + i * 60, w = 400, h = 50;
      if (mx > x && mx < x + w && my > y && my < y + h) {
        if (this.options[i] === this.correctWord) {
          this.feedback = "Correct!";
          this.score++;
        } else {
          this.feedback = "Try again!";
        }
        this.count++;
        this.timer = millis() + 1000;
      }
    }
  }
}

