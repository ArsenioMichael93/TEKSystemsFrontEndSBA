const canvas = document.getElementById('snakegame');
const ctx = canvas.getContext('2d');

let speed = 7;
let score = 0;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

//snake head
let headX = 10;
let headY = 10;
//snake body
const snakebody = [];
let taillength = 2;
class SnakeBody {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
//snake movement
let xVelocity = 0;
let yVelocity = 0;

//food
let foodX = 5;
let foodY = 5;

//game loop
function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();

    checkFood();
    drawfood();
    drawSnake();

    drawScore();
    setTimeout(drawGame, 1000 / speed);

    if(score>2){
        speed = 10;
    }

    if(score>5){
        speed = 15;
    }

    if(score>10){
        speed = 20;
    }
    if(score>25){
        speed = 25;
    }

}
function isGameOver(){
    let gameOver = false;
    if(yVelocity ===0 && xVelocity===0){
        return false;
    }

    //walls
    if (headX < 0) {
        gameOver = true;
    } else if (headX === tileCount) {
        gameOver = true;
    } else if (headY < 0) {
        gameOver = true;
    } else if (headY === tileCount) {
        gameOver = true;
    }

    for(let i=0; i <snakebody.length;i++){
        let part = snakebody[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", " magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        ctx.fillStyle = gradient;

        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }

    return gameOver;
}
function drawScore(){
    ctx.fillStyle = "white"
    ctx.font = "10px Verdana"
    ctx.fillText("Score "+ score, canvas.width-50, 10);
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    //had to move head(orange) to bottom.

    //body
    ctx.fillStyle = 'green'
    for (let i = 0; i < snakebody.length; i++) {
        let part = snakebody[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)

    }

    snakebody.push(new SnakeBody(headX, headY));
    if(snakebody.length > taillength){
        snakebody.shift();
    }
    //head
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)

}
function drawfood() {
    ctx.fillStyle = "red"
    ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize)
}
function checkFood() {
    if (foodX === headX && foodY === headY) {
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        taillength++
        score++
    }
}

function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    console.log('work')
    //all keycodes can be found at https://keycode.info/
    //up
    if (event.keyCode == 38) {
        if (yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    //down
    if (event.keyCode == 40) {
        if (yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    //left
    if (event.keyCode == 37) {
        if (xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
    //right
    if (event.keyCode == 39) {
        if (xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame()