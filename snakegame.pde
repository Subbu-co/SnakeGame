// Snake Game in Processing (Java mode)

int cols, rows;
int scl = 20;  // Size of each grid cell

ArrayList<PVector> snake; 
PVector food;
PVector dir;

boolean gameOver = false;

void setup() {
  size(600, 600);
  frameRate(10);
  cols = width / scl;
  rows = height / scl;

  snake = new ArrayList<PVector>();
  snake.add(new PVector(cols/2, rows/2));
  dir = new PVector(1, 0);

  placeFood();
}

void draw() {
  background(51);

  if (!gameOver) {
    updateSnake();
    checkCollisions();
  }

  drawSnake();
  drawFood();

  if (gameOver) {
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("GAME OVER!", width/2, height/2);
    textSize(16);
    text("Press 'R' to Restart", width/2, height/2 + 40);
  }
}

void updateSnake() {
  // Move snake
  PVector head = snake.get(0).copy();
  head.add(dir);

  // Wrap around edges
  if (head.x < 0) head.x = cols - 1;
  if (head.x >= cols) head.x = 0;
  if (head.y < 0) head.y = rows - 1;
  if (head.y >= rows) head.y = 0;

  snake.add(0, head);

  // Eat food
  if (head.equals(food)) {
    placeFood();
  } else {
    snake.remove(snake.size() - 1);
  }
}

void checkCollisions() {
  PVector head = snake.get(0);
  for (int i = 1; i < snake.size(); i++) {
    if (head.equals(snake.get(i))) {
      gameOver = true;
    }
  }
}

void drawSnake() {
  fill(0, 255, 0);
  for (PVector s : snake) {
    rect(s.x * scl, s.y * scl, scl, scl);
  }
}

void drawFood() {
  fill(255, 0, 0);
  rect(food.x * scl, food.y * scl, scl, scl);
}

void placeFood() {
  food = new PVector(floor(random(cols)), floor(random(rows)));
}

void keyPressed() {
  if (keyCode == UP && dir.y != 1) {
    dir = new PVector(0, -1);
  } else if (keyCode == DOWN && dir.y != -1) {
    dir = new PVector(0, 1);
  } else if (keyCode == LEFT && dir.x != 1) {
    dir = new PVector(-1, 0);
  } else if (keyCode == RIGHT && dir.x != -1) {
    dir = new PVector(1, 0);
  } else if (key == 'r' || key == 'R') {
    restartGame();
  }
}

void restartGame() {
  snake.clear();
  snake.add(new PVector(cols/2, rows/2));
  dir = new PVector(1, 0);
  gameOver = false;
  placeFood();
}
