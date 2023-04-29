// Variables globales
let mosca = [];
let semilla = [];
let ganaste = false;
let sfxfly;
let sfxeat;
let music;

function preload() {
  fondo = loadImage("https://i.imgur.com/S3hqHbP.jpg");
  moscaImg = loadImage("https://i.imgur.com/VmOO1aV.png");
  semillaImg = loadImage("https://i.imgur.com/CnnGmRr.png");
  sfxfly = loadSound("fly.wav");
  sfxeat = loadSound("eat.wav");
  music = loadSound("music.mp3");
}

// Función para ajustar el fondo y crear moscas y semillas
function setup() {
  createCanvas(400, 400);
  imageMode(CORNERS);

  // Crear moscas y semillas aleatorias
  for (let i = 0; i < 4; i++) {
    mosca.push(new Mosca(moscaImg));
  }
  for (let i = 0; i < 15; i++) {
    semilla.push(new Semilla(semillaImg));
  }
}

function draw() {
  background(fondo);

  if (!ganaste) {
    // Mostrar objetos de juego
    for (let i = 0; i < mosca.length; i++) {
      mosca[i].show();
    }
    for (let i = 0; i < semilla.length; i++) {
      semilla[i].show();
    }
    if(music.isPlaying() == false){
      music.play();
    }
    // Verificar si ganaste
    if (mosca.length == 0) {
      ganaste = true;
      sfxeat.play();
    }
  }
}

function mouseClicked() {
  for (let i = 0; i < mosca.length; i++) {
    if (mosca[i].contains(mouseX, mouseY)) {
      mosca.splice(i, 1);
      sfxfly.play();
    }
  }
}

// Clase base para los objetos
class objeto {
  constructor(img) {
    this.img = img;
    this.x = random(60,340);
    this.y = random(60,340);
    this.angle = random(TWO_PI);
  }

  update() {}

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.img, 0, 0);
    pop();
  }

  contains(x, y) {
    let d = dist(x, y, this.x, this.y);
    return d < this.img.width / 2;
  }
}

// Clase para las moscas
class Mosca extends objeto {
  constructor(img) {
    super(img);
  }
}

// Clase para las semillas
class Semilla extends objeto {
  constructor(img) {
    super(img);
  }
}
//Función para evitar que los objetos aparezcan encima de otro (A veces funciona)
function ObjetoOverlay(x, y) {
  for (var i = 0; i < objeto.length; i++) {
    var distancia = dist(x, y, objeto[i].x, objeto[i].y);
    if (distancia < diametroObjeto) {
      return true;
    }
  }
  return false;
}