/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/
function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent("p5-canvas-container")
}

function draw() {
    background(220);

    for (let i = 0; i < 6; i++) {
        // Move from bottom to top (no going back)
        let x = width / 2 + sin(frameCount * 0.005 + i) * 50 + noise(i * 0.1, frameCount * 0.01) * 30;
        let y = height - (frameCount * 0.5 + i * 50) % height; // This makes them move upward

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