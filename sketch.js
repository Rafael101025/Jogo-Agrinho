let instrucoes = true;
let clicouEsquerdo = false;

const mapaLargura = 800;  // Nova largura
const mapaAltura = 600;   // Nova altura
const jogadorTamanho = 30;
const milhoTamanho = 20;

let jogador;
let milhoPontos = [];
let pontos = 0;

let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;

let venceu = false;

function setup() {
  createCanvas(mapaLargura, mapaAltura);  // Cria o canvas com as novas dimensões
  jogador = new Jogador();
  for (let i = 0; i < 10; i++) {  // Aumentei a quantidade inicial de milhos
    milhoPontos.push(new Milho());
  }
  textSize(20);
}

function draw() {
  if (instrucoes) {
    background(50, 100, 30);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Clique com o botão ESQUERDO do mouse\n e pressione a tecla ESPAÇO para iniciar\n\nColete os milhos e abasteça o mercado da cidade", width / 2, height / 2);
    return; // não roda o resto do draw enquanto estiver na tela de instruções
  }

  background(100, 180, 50);

  if (!venceu) {
    if (moveUp) jogador.mover(0, -1);
    if (moveDown) jogador.mover(0, 1);
    if (moveLeft) jogador.mover(-1, 0);
    if (moveRight) jogador.mover(1, 0);

    jogador.update();
    jogador.show();

    for (let i = milhoPontos.length - 1; i >= 0; i--) {
      milhoPontos[i].show();

      if (jogador.coletou(milhoPontos[i])) {
        pontos++;
        milhoPontos.splice(i, 1);
      }
    }

    if (random(1) < 0.01) {
      milhoPontos.push(new Milho());
    }

    fill(255);
    text("Pontos: " + pontos, 10, 25);

    if (pontos >= 50) {
      venceu = true;
    }
  } else {
    background(0, 150, 0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("Parabéns!!", width / 2, height / 2 - 40);
    textSize(20);
    text("Você conseguiu coletar os milhos,\n agora a cidade ficou abastecida.", width / 2, height / 2 + 10);
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    clicouEsquerdo = true;
  }
}

function keyPressed() {
  if (instrucoes) {
    if (key === ' ' && clicouEsquerdo) {
      instrucoes = false; // Sai da tela de instruções e começa o jogo
    }
  } else if (!venceu) {
    if (keyCode === LEFT_ARROW) {
      moveLeft = true;
    } else if (keyCode === RIGHT_ARROW) {
      moveRight = true;
    } else if (keyCode === UP_ARROW) {
      moveUp = true;
    } else if (keyCode === DOWN_ARROW) {
      moveDown = true;
    }
  }
}

function keyReleased() {
  if (!instrucoes) {
    if (keyCode === LEFT_ARROW) {
      moveLeft = false;
    } else if (keyCode === RIGHT_ARROW) {
      moveRight = false;
    } else if (keyCode === UP_ARROW) {
      moveUp = false;
    } else if (keyCode === DOWN_ARROW) {
      moveDown = false;
    }
  }
}

class Jogador {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.speed = 4;
    this.size = jogadorTamanho;
  }

  update() {
    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
  }

  show() {
    fill(0, 0, 200);
    rect(this.x, this.y, this.size, this.size);
  }

  mover(dx, dy) {
    this.x += dx * this.speed;
    this.y += dy * this.speed;
  }

  coletou(milho) {
    return !(this.x + this.size < milho.x ||
             this.x > milho.x + milho.size ||
             this.y + this.size < milho.y ||
             this.y > milho.y + milho.size);
  }
}

class Milho {
  constructor() {
    this.size = milhoTamanho;
    this.x = random(width - this.size);
    this.y = random(height - this.size);
  }

  show() {
    fill(255, 220, 0);
    ellipse(this.x + this.size / 2, this.y + this.size / 2, this.size, this.size);
    fill(0, 150, 0);
    rect(this.x + this.size / 2 - 3, this.y + this.size / 2, 6, this.size / 2);
  }
}
