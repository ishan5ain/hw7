var puck = {
  x: 200,
  y: 200,
  xSpeed: 3,
  ySpeed: -1,
  r: 10,
  reset: function() {
    this.x = 200;
    this.y = 200;
  }
};
var edgeOffset = 20;

var player1 = {
  x: edgeOffset,
  y: 200,
  ht: 50,
  wd: 10,
  score: 0
};

var player2 = {
  x: 400 - edgeOffset,
  y: 200,
  ht: 50,
  wd: 10,
  score: 0
};

//color variables
var puckColor = 255;
var playerColor = 255;

//sounds variables
var wallHit;
var playerHit;
var oops;


function preload(){
  wallHit = loadSound('assets/pong-wall.wav');
  playerHit = loadSound('assets/pong-player.wav');
  oops = loadSound('assets/pong-oops.wav');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  noStroke();

  //draw the centered dashed line
  push();
  stroke(255);
  for(var l = 0; l < 20; l++){
    line(width/2, ((height/20)*l)+5, width/2, ((height/20)*l)+10);
  }
  pop();

  // draw puck
  push();
  fill(puckColor);
  ellipse(puck.x, puck.y, puck.r * 2);
  pop();

  // move puck
  if (puck.y < puck.r || puck.y > height - puck.r) {
    puck.ySpeed = -puck.ySpeed;
    wallHit.play();
  }

  puck.x += puck.xSpeed;
  puck.y += puck.ySpeed;

  // draw paddles
  push();
  fill(playerColor);
  rect(player1.x, player1.y, player1.wd, player1.ht);
  rect(player2.x - player2.wd, player2.y, player2.wd, player2.ht);
  pop();

  // paddle movement
  if (player1.paddleDown && !player1.paddleUp) {
    player1.y += 3;
  }
  if (player1.paddleUp && !player1.paddleDown) {
    player1.y -= 3;
  }

  if (player2.paddleDown && !player2.paddleUp) {
    player2.y += 3;
  }
  if (player2.paddleUp && !player2.paddleDown) {
    player2.y -= 3;
  }

  // don't let paddles outside of the play area
  player1.y = constrain(player1.y, 0, height - player1.ht - 1);
  player2.y = constrain(player2.y, 0, height - player2.ht - 1);

  // bounce puck on paddles -- player 1 -- based on x-coordinate
  if (puck.x - puck.r < player1.x + player1.wd) {
    // check if puck is within paddle height...
    if (puck.y > player1.y && puck.y < player1.y + player1.ht) {
      puck.xSpeed = abs(puck.xSpeed);
      playerHit.play();
    } else {
      // reset the puck, updates the score and change the xSpeed according to the winner
      if (puck.x < 0) {
        oops.play();
        puck.xSpeed = abs(puck.xSpeed);
        puck.reset();
        player2.score++;
      }
    }
  }

  // bounce puck on paddles -- player 2 -- based on x-coordinate
  if (puck.x + puck.r > player2.x - player2.wd) {
    // check if puck is within paddle height...
    if (puck.y > player2.y && puck.y < player2.y + player2.ht) {
      puck.xSpeed = -abs(puck.xSpeed);
      playerHit.play();
    } else {
      // reset the puck, updates the score and change the xSpeed according to the winner
      if (puck.x > width) {
        oops.play();
        puck.xSpeed = -abs(puck.xSpeed);
        puck.reset();
        player1.score++;
      }
    }
  }

  push();
  fill(255);
  textSize(20);
  text(player1.score, (width / 10) * 1, height * 0.10);
  text(player2.score, (width / 10) * 9, height * 0.10);
  pop();
}

// keyboard input
function keyPressed() {
  print(key);
  if (key == 'S') {
    player1.paddleDown = true;
  } else if (key == 'W') {
    player1.paddleUp = true;
  }

  if (keyCode == DOWN_ARROW) {
    player2.paddleDown = true;
  } else if (keyCode == UP_ARROW) {
    player2.paddleUp = true;
  }
}

function keyReleased() {
  if (key == 'S') {
    player1.paddleDown = false;
  } else if (key == 'W') {
    player1.paddleUp = false;
  }

  if (keyCode == DOWN_ARROW) {
    player2.paddleDown = false;
  } else if (keyCode == UP_ARROW) {
    player2.paddleUp = false;
  }
}
