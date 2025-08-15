let scl = 20;  
let cols, rows;
let snake = [];
let food;
let dir;
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(600, 600);
  frameRate(10);
  cols = floor(width / scl);
  rows = floor(height / scl);

  snake = [{x: floor(cols/2), y: floor(rows/2)}];
  dir = {x: 1, y: 0};
  placeFood();
}

function draw() {
  background(30);

  if (!gameOver) {
    updateSnake();
    checkCollisions();
  }

  drawSnake();
  drawFood();

  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Score: " + score, 10, 10);

  if (gameOver) {
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("GAME OVER!", width/2, height/2);
    textSize(18);
    text("Press 'R' to Restart", width/2, height/2 + 40);
  }
}

function updateSnake() {
  let head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};

  if (head.x < 0) head.x = cols - 1;
  if (head.x >= cols) head.x = 0;
  if (head.y < 0) head.y = rows - 1;
  if (head.y >= rows) head.y = 0;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    if (score % 5 === 0) frameRate(frameRate() + 1);
    placeFood();
  } else {
    snake.pop();
  }
}

function checkCollisions() {
  let head = snake[0];
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver = true;
    }
  }
}

function drawSnake() {
  fill(0, 255, 0);
  for (let s of snake) {
    rect(s.x * scl, s.y * scl, scl, scl);
  }
}

function drawFood() {
  fill(255, 0, 0);
  rect(food.x * scl, food.y * scl, scl, scl);
}

function placeFood() {
  food = {x: floor(random(cols)), y: floor(random(rows))};
}

function keyPressed() {
  if (keyCode === UP_ARROW && dir.y !== 1) dir = {x: 0, y: -1};
  else if (keyCode === DOWN_ARROW && dir.y !== -1) dir = {x: 0, y: 1};
  else if (keyCode === LEFT_ARROW && dir.x !== 1) dir = {x: -1, y: 0};
  else if (keyCode === RIGHT_ARROW && dir.x !== -1) dir = {x: 1, y: 0};
  else if (key === 'r' || key === 'R') restartGame();
}

function restartGame() {
  score = 0;
  snake = [{x: floor(cols/2), y: floor(rows/2)}];
  dir = {x: 1, y: 0};
  frameRate(10);
  gameOver = false;
  placeFood();
}
