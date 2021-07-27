let currentColor = 'black';
let canDraw = false;

let screen = document.querySelector('#tela'); //selecionar elemento tela
let context = screen.getContext('2d');
let mouseX = 0;
let mouseY = 0;

//escolher cor
document.querySelectorAll('.colorArea .color').forEach((item) => {
  item.addEventListener('click', colorClickEvent);
});

//registra os eventos do mouse
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);

//ação de limpar tela
document.querySelector('.clear').addEventListener('click', clearScreen);

function colorClickEvent(event) {
  let color = event.target.getAttribute('data-color');
  currentColor = color;

  //alterna destaque da cor selecionada
  document.querySelector('.color.active').classList.remove('active');
  event.target.classList.add('active');
}

function mouseDownEvent(event) {
  canDraw = true;
  mouseX = event.pageX - screen.offsetLeft; //identifica a posição do mouse em relação a pág e diminui a distância da screen até a borda da pág
  mouseY = event.pageY - screen.offsetTop;
}

function mouseMoveEvent(event) {
  if (canDraw) {
    draw(event.pageX, event.pageY);
  }
}

function mouseUpEvent() {
  canDraw = false;
}

function draw(x, y) {
  let pointX = x - screen.offsetLeft;
  let pointY = y - screen.offsetTop;

  context.beginPath();
  context.lineWidth = 5; //define a espessura da linha (5px)
  context.lineJoin = 'round'; //define a forma da linha, nesse caso circular
  context.moveTo(mouseX, mouseY);
  context.lineTo(pointX, pointY);
  context.closePath();
  context.strokeStyle = currentColor; //preenche a cor
  context.stroke();

  //set dos pontos para continuidade
  mouseX = pointX;
  mouseY = pointY;
}

function clearScreen() {
  context.setTransform(1, 0, 0, 1, 0, 0); //matrix 2d para definir parâmetros
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); //limpa a screen
}
