/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/
let t = 0;
function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent("p5-canvas-container")
}


function draw() {
    background(220);

    for (let x = 0; x < width; x += 30) {
        for (let y = 0; y < height; y += 30) {

            let noiseValue = noise(x * 0.1, y * 0.1, t);

            let col;
            if (noiseValue < 0.5) {

                col = color(noiseValue * 50 + 50, noiseValue * 200 + 50, noiseValue * 50 + 50);
            } else {

                col = color(noiseValue * 40 + 30, noiseValue * 100 + 60, noiseValue * 30 + 30);
            }

            fill(col);
            noStroke();
            rect(x, y, 30, 30);
        }
    }

    t += 0.01;

    for (let i = 3; i < 15; i++) {
        let x = width / 2 + sin(frameCount * 0.00005 + i) * 200 + noise(i * 0.1, frameCount * 0.0001) * 100;

        let yOffset = i * 95;
        let y = height + 450 - ((frameCount * 0.5 + yOffset) % (height + 500));



        drawCreature(x, y);
    }
}

function drawCreature(x, y) {
    push();
    translate(x, y);

    drawBody();
    drawHead();

}

function drawBody() {
    noStroke();
    fill(map(mouseX, 0, width, 50, 200), 200, 100);
    for (let i = 0; i < 10; i++) {
        let offsetX = sin(frameCount * 0.05 + i * 0.5) * 10 + noise(i * 0.1, frameCount * 0.02) * 10;
        let offsetY = cos(frameCount * 0.04 + i * 0.3) * 5 + noise(i * 0.2, frameCount * 0.02) * 10;
        let size = map(mouseY, 0, height, 20, 40);
        ellipse(offsetX, offsetY - i * 15, size, size);
    }
}

function drawHead() {
    fill(50, 150, 50);
    let headSize = map(mouseY, 0, height, 30, 50);
    ellipse(0, -150, headSize, headSize);

    if (mouseIsPressed) {
        fill(255, 0, 0);
        arc(0, -150, 20, 20, 0, PI);
        fill(255);
        triangle(-5, -145, 0, -135, 5, -145);
    }


    pop();
}  