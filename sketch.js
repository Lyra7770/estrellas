let numEstrellas = 300;
let estrellas = [];

let fugaz;
let hayFugaz = false;
let ultimoMovimiento = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  estrellas = [];
  for (let i = 0; i < numEstrellas; i++) {
    estrellas.push(new Estrella());
  }
  background(10, 10, 30);
}

function draw() {
  // Fondo semitransparente para dejar estela
  fill(10, 10, 30, 40);
  noStroke();
  rect(0, 0, width, height);

  // Estrellas normales
  for (let estrella of estrellas) {
    estrella.parpadear();
    estrella.mostrar();
  }

  // Estrella fugaz
  if (hayFugaz) {
    fugaz.mover();
    fugaz.mostrar();
    if (fugaz.termino()) {
      hayFugaz = false;
    }
  }
}

function mouseMoved() {
  if (millis() - ultimoMovimiento > 2000) {
    fugaz = new EstrellaFugaz();
    hayFugaz = true;
    ultimoMovimiento = millis();
  }
}

class Estrella {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.brillo = random(100, 255);
    this.delta = random(0.5, 1.5);
  }

  parpadear() {
    this.brillo += random(-this.delta, this.delta);
    this.brillo = constrain(this.brillo, 100, 255);
  }

  mostrar() {
    noStroke();
    fill(this.brillo);
    ellipse(this.x, this.y, 2, 2);
  }
}

class EstrellaFugaz {
  constructor() {
    this.x = random(width * 0.5);
    this.y = random(height * 0.5);
    this.vx = random(10, 15);
    this.vy = random(4, 8);
    this.duracion = 40;
    this.vida = 0;
  }

  mover() {
    this.x += this.vx;
    this.y += this.vy;
    this.vida++;
  }

  mostrar() {
    stroke(255, 255, 200, 200);
    strokeWeight(2);
    line(this.x, this.y, this.x - this.vx * 2, this.y - this.vy * 2);
  }

  termino() {
    return this.vida > this.duracion || this.x > width || this.y > height;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
