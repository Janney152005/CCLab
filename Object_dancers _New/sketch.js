/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/


let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new JaneDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();

  dancer.x = mouseX;
  dancer.y = mouseY;
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class JaneDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.angle = 0;

  }

  update() {
    this.angle += 0.15;
  }

  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(-width / 2, -height / 2);
    translate(this.x, this.y);
    // console.log(this.x, this.y)


    // ******** //
    // ⬇️ draw your dancer from here ⬇️  
    let motion = sin(frameCount * 0.15) * 2;
    let armWave = sin(frameCount * 0.1) * 5;
    let handWave = cos(frameCount * 0.15) * 3;
    let tap = sin(frameCount * 0.15) * 2;
    //Body
    fill("pink");
    noStroke();
    rect(width / 2 - 45 + motion, height / 2 - 50, 70, 100);

    //left eye
    fill("white");
    noStroke();
    circle(width / 2 - 10 + motion / 2, height / 2 + 5, 15);
    //left eyeball
    fill(0);
    noStroke();
    ellipse(width / 2 - 9 + motion / 2, height / 2 + 5, 12, 2 * (sin(frameCount / 20) + 5));
    //left hint
    fill(220);
    noStroke();
    circle(width / 2 - 6 + motion / 2, height / 2 + 3, 3);
    //left eyelashes
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(width / 2 - 10 + motion / 2, height / 2 + 2, 12, 10, PI, 0);
    noFill();
    stroke(0);
    strokeWeight(2);
    line(width / 2 - 17 + motion / 2, height / 2 + 2, width / 2 - 20 + motion / 2, height / 2 + 3);
    line(width / 2 - 17 + motion / 2, height / 2 + 3, width / 2 - 20 + motion / 2, height / 2 + 4);
    //left eyebrow
    push();
    translate(width / 2, height / 2)
    rotate(-sin(frameCount / 20) / 10)
    fill(0);
    noStroke();
    arc(-10 + motion / 2, -7, 15, 5, PI, 0);
    noFill();
    stroke(0);
    strokeWeight(2);
    line(-14 + motion / 2, -8, motion / 2, -6);
    pop();

    //right eye
    fill("white");
    noStroke();
    circle(width / 2 + 10 + motion / 2, height / 2 + 5, 15);
    //right eyeball
    fill(0);
    noStroke();
    ellipse(width / 2 + 11 + motion / 2, height / 2 + 5, 12, 2 * (sin(frameCount / 20) + 5));
    //right hint
    fill(220);
    noStroke();
    circle(width / 2 + 15 + motion / 2, height / 2 + 3, 3);
    //right eyelashes
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(width / 2 + 10 + motion / 2, height / 2 + 2, 12, 10, PI, 0);
    noFill();
    stroke(0);
    strokeWeight(2);
    line(width / 2 + 17 + motion / 2, height / 2 + 3, width / 2 + 20 + motion / 2, height / 2 + 2);
    line(width / 2 + 17 + motion / 2, height / 2 + 4, width / 2 + 20 + motion / 2, height / 2 + 3);
    //right eyebrow
    push();
    translate(width / 2, height / 2)
    rotate(sin(frameCount / 20) / 10)
    fill(0);
    noStroke();
    arc(10 + motion / 2, -7, 15, 5, PI, 0);
    noFill();
    stroke(0);
    strokeWeight(2);
    line(+14 + motion / 2, -8, 20 + motion / 2, -6);
    pop();

    //mouth
    //upperlip
    noFill();
    stroke(0);
    strokeWeight(1);
    arc(width / 2 + motion / 2, height / 2 + 17, 15, 5, 0, PI);
    //lower
    noFill();
    stroke(0);
    strokeWeight(1.5);
    arc(width / 2 + motion / 2, height / 2 + 22, 25, 15, 0, PI);
    line(width / 2 - 8 + motion / 2, height / 2 + 17, width / 2 - 13 + motion / 2, height / 2 + 22);
    line(width / 2 + 8 + motion / 2, height / 2 + 17, width / 2 + 13 + motion / 2, height / 2 + 22);
    //teeth
    fill("white");
    noStroke();
    arc(width / 2 + motion / 2, height / 2 + 20, 10, 5, 0, PI);
    //tongue
    fill(255, 0, 0);
    noStroke();
    arc(width / 2 + motion / 2, height / 2 + 27, 15, 10, PI, 0);
    arc(width / 2 + motion / 2, height / 2 + 27, 12, 5, 0, PI);

    //arms 

    stroke("pink");
    strokeWeight(2);

    //left arm
    line(width / 2 - 45 + motion, height / 2 - 10, width / 2 - 65 + motion, height / 2 + 10 + armWave);
    line(width / 2 - 65 + motion, height / 2 + 10 + armWave, width / 2 - 40 + motion, height / 2 + 25 + handWave);

    //right arm
    line(width / 2 + 25 + motion, height / 2 - 5, width / 2 + 45 + motion, height / 2 + 5 - armWave);
    line(width / 2 + 45 + motion, height / 2 + 5 - armWave, width / 2 + 65 + motion, height / 2 - 20 + handWave);

    //fingers
    //left
    noFill();
    strokeWeight(2);
    stroke("pink");
    ellipse(width / 2 - 30 + motion, height / 2 + 25 + handWave, 20, 5);
    strokeWeight(3);
    line(width / 2 - 40 + motion, height / 2 + 25 + handWave, width / 2 - 25 + motion, height / 2 + 18 + handWave);

    //right
    noFill();
    strokeWeight(2);
    stroke("pink");
    ellipse(width / 2 + 75 + motion, height / 2 - 20 + handWave, 20, 5);
    strokeWeight(3);
    line(width / 2 + 65 + motion, height / 2 - 19 + handWave, width / 2 + 80 + motion, height / 2 - 26 + handWave);


    //legs
    //left
    line(width / 2 - 25, height / 2 + 50, width / 2 - 25, height / 2 + 90);
    //right
    line(width / 2 + 5, height / 2 + 50, width / 2 + 5, height / 2 + 90);

    //feet

    //left
    stroke("pink");
    strokeWeight(2);
    fill("pink");
    ellipse(width / 2 - 18, height / 2 + 90 + tap, 20, 10);

    //right
    stroke("pink");
    strokeWeight(2);
    fill("pink");
    ellipse(width / 2 + 13, height / 2 + 90 - tap, 20, 10);

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.

    this.drawReferenceShapes();
    pop();

  }

  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(width / 2 - 100, height / 2 - 100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/