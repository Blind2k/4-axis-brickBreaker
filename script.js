// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Build_the_brick_field

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;

//BALL
var ballRadius = 10;
var dx = 2;
var dy = -2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

//LEVEL UP
var playerLevel = 1;

//PADDLE
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = canvas.height - paddleHeight;

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

// USER
var moveLeft = false;
var moveUp = false;
var moveRight = false;
var moveDown = false;

//KEYDOWN LOGIC
document.addEventListener("keydown", trueMotionHandler);
function trueMotionHandler(event) {
  if (event.keyCode === 37) {
    moveLeft = true;
  }
  if (event.keyCode === 38) {
    moveUp = true;
  }
  if (event.keyCode === 39) {
    moveRight = true;
  }
  if (event.keyCode === 40) {
    moveDown = true;
  }
}
//KEYUP LOGIC
document.addEventListener("keyup", falseMotionHandler);
function falseMotionHandler(event) {
  if (event.keyCode === 37) {
    moveLeft = false;
  }
  if (event.keyCode === 38) {
    moveUp = false;
  }
  if (event.keyCode === 39) {
    moveRight = false;
  }
  if (event.keyCode === 40) {
    moveDown = false;
  }
}
// MOUSE CONTROL
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(event) {
  var relativeMouseX = event.clientX - canvas.offsetLeft;
  if (relativeMouseX > 0 && relativeMouseX < canvas.width) {
    paddleX = relativeMouseX - paddleWidth / 2;
  }
  var relativeMouseY = event.clientY;
  if (relativeMouseY > 0 && relativeMouseY < canvas.height) {
    paddleY = relativeMouseY - paddleHeight / 2;
  }
}

// BRICKS
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricksArray = [];

for (var c = 0; c < brickColumnCount; c++) {
  // console.log(bricksArray)
  bricksArray[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricksArray[c][r] = { x: 0, y: 0, status: 1 };
  }
}
// BRICKS LOGIC
function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricksArray[c][r].status == 1) {
        var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricksArray[c][r].x = brickX;
        bricksArray[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// SCORE
var thisGameScore = 0;

function drawThisGameScore() {
  ctx.font = "15px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + thisGameScore, 8, 20);
}

//EXTRA LIFE
var totalLife = 3;

function drawTotalLife() {
  ctx.font = "15px Arial";
  ctx.fontStyle = "white";
  ctx.fillText("Total Life: " + totalLife, canvas.width-80, 20);
}

// DETECTION LOGIC
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      var b = bricksArray[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          thisGameScore++;
          if (thisGameScore == brickColumnCount * brickRowCount) {
            alert("YOU WIN!!!");
            document.location.reload();
          }
        }
      }
    }
  }
}

// DRAW FUNCTION
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawThisGameScore();
  drawTotalLife();

  x += dx;
  y += dy;

  // BALL MOTION
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      totalLife--;
      alert("Be care full");
      x = canvas.width/2;
      y = canvas.height-30;
      dx = 2;
      dy =-2;
      paddleX = (canvas.width - paddleWidth)/2
    }
    if (!totalLife) {
      alert("GAME OVER BUDDY");
      document.location.reload();
    }
  }
  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
  }
  if (
    x > paddleX &&
    x < paddleX + paddleWidth &&
    y > paddleY &&
    y < paddleY + paddleHeight
    ) {
      dy = -dy;
    }
    
    // PLAYER MOTION IN GAME
    if (moveLeft) {
      paddleX -= 7;
      if (paddleX < 0) {
        paddleX = 0;
      }
    }
    if (moveRight) {
      paddleX += 7;
      if (paddleX + paddleWidth > canvas.width) {
        paddleX = canvas.width - paddleWidth;
      }
    }
    if (moveUp) {
      paddleY -= 2;
      if (paddleY === 0) {
        paddleY = paddleHeight;
      }
    }
    if (moveDown) {
      paddleY += 2;
      if (paddleY + paddleHeight > canvas.height) {
        paddleY = canvas.height - paddleHeight;
      }
    }
    requestAnimationFrame(draw)         
  }
  
  draw();
  // var gameInterval = setInterval(draw, 10); //      clearInterval(gameInterval)=> Browser control