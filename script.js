const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;

//LEVEL UP
var playerLevel = 1;

function drawPlayerLevel() {
  ctx.font = "15px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Your Level: " + playerLevel, 200, 20);
}

//BALL variables
var ballRadius = 10;
var dx = playerLevel;
var dy = -playerLevel;

//BALL function
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

//PADDLE variables
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = canvas.height - paddleHeight;

//PADDLE Functions
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

// USER variables
var moveLeft = false;
var moveUp = false;
var moveRight = false;
var moveDown = false;

//KEYDOWN LOGIC UP
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
//KEYUP LOGIC DOWN
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
  //MOUSE HORIZONTAL MOTION
  var relativeMouseX = event.clientX - canvas.offsetLeft;
  if (relativeMouseX > 0 && relativeMouseX < canvas.width) {
    paddleX = relativeMouseX - paddleWidth / 2;
  }
  //MOUSE VERTICAL MOTION
  var relativeMouseY = event.clientY;
  if (relativeMouseY > 0 && relativeMouseY < canvas.height) {
    paddleY = relativeMouseY - paddleHeight / 2;
  }
}

// BRICKS VARIABLES
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricksArray = [];

//BRICK ARRAY MARGIN
function CreatingBrickArray() {
  for (var c = 0; c < brickColumnCount; c++) {
    bricksArray[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
      bricksArray[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
}
CreatingBrickArray();

// BRICKS LOGIC
function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    //loop throh (c)olumn
    for (var r = 0; r < brickRowCount; r++) {
      //loop throh (r)ow
      if (bricksArray[c][r].status == 1) {
        //show unbroken bricks
        var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft; //brick length
        var brickY = r * (brickHeight + brickPadding) + brickOffsetTop; //brick height
        bricksArray[c][r].x = brickX; //asseign brick length
        bricksArray[c][r].y = brickY; //asseign brick height
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// SCORE variables
var thisGameScore = 0;
var generalScore = 0;

//SCORE function
function drawScore() {
  ctx.font = "15px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + generalScore, 8, 20);
}

//EXTRA LIFE variables
var totalLife = 3;

//EXTRA LIFE function
function drawTotalLife() {
  ctx.font = "15px Arial";
  ctx.fontStyle = "white";
  ctx.fillText("Total Life: " + totalLife, canvas.width - 80, 20);
}

// DETECTION LOGIC
function collisionDetection() {
  //calculations to conclude which brick broke
  for (let c = 0; c < brickColumnCount; c++) {
    //loop throh (c)olumn
    for (let r = 0; r < brickRowCount; r++) {
      //loop throh (r)ow
      var b = bricksArray[c][r]; //declare b variable
      if (b.status == 1) {
        //hitting an unbroken brick
        if (
          x > b.x && //balls's centered, horizontal location is bigger than the brick's centered horizontal distence from the lefet of the screen
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          thisGameScore++;
          generalScore++;
          if (thisGameScore == brickColumnCount * brickRowCount) {
            //WON THE LEVEL
            alert("Level Up!!!");
            playerLevel++;
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = playerLevel;
            dy = -playerLevel;
            paddleX = (canvas.width - paddleWidth) / 2;
            thisGameScore = 0;
            CreatingBrickArray();
          }
        }
      }
    }
  }
}

//READY MARK
var playerReady = false;

// DRAW FUNCTION
function draw() {
  if (playerReady) {
    
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawScore();
  drawTotalLife();
  drawPlayerLevel();

  x += dx;
  y += dy;

  // BALL MOTION
  if (y + dy < ballRadius) {
    //Bounce from the top
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    //fall down
    if (x > paddleX && x < paddleX + paddleWidth) {
      //bounce from paddle ONLY X
      dy = -dy;
    } else {
      //let the ball fall down //LOSE LIFE
      totalLife--;
      alert("Are you ready for your try?");
      x = canvas.width / 2;
      y = canvas.height - 30;
      dx = playerLevel;
      dy = -playerLevel;
      paddleX = (canvas.width - paddleWidth) / 2;
    }
    if (!totalLife) {
      //NO MORE LIFE
      alert("GAME OVER BUDDY");
      document.location.reload();
    }
  }
  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    //bounce from the sides
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
  requestAnimationFrame(draw);
}

draw();
// var gameInterval = setInterval(draw, 10); //      clearInterval(gameInterval)=> Browser control
