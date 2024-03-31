
// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
const playerWidth = 20;
const playerHeight = 20;
const playerSpeed = 5;
let playerX = (canvas.width - playerWidth) / 2;
const enemyRowCount = 5;
const enemyColumnCount = 10;
const enemyWidth = 20;
const enemyHeight = 20;
const enemyPadding = 10;
const enemyOffsetTop = 30;
const enemyOffsetLeft = 30;
const enemies = [];

// Create enemies
for (let c = 0; c < enemyColumnCount; c++) {
    enemies[c] = [];
    for (let r = 0; r < enemyRowCount; r++) {
        enemies[c][r] = { x: 0, y: 0, alive: true };
    }
}

// Player controls
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let rightPressed = false;
let leftPressed = false;

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

// Game loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawEnemies();

    if (rightPressed && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    } else if (leftPressed && playerX > 0) {
        playerX -= playerSpeed;
    }

    requestAnimationFrame(draw);
}

function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX, canvas.height - playerHeight, playerWidth, playerHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawEnemies() {
    for (let c = 0; c < enemyColumnCount; c++) {
        for (let r = 0; r < enemyRowCount; r++) {
            if (enemies[c][r].alive) {
                const enemyX = c * (enemyWidth + enemyPadding) + enemyOffsetLeft;
                const enemyY = r * (enemyHeight + enemyPadding) + enemyOffsetTop;
                enemies[c][r].x = enemyX;
                enemies[c][r].y = enemyY;
                ctx.beginPath();
                ctx.rect(enemyX, enemyY, enemyWidth, enemyHeight);
                ctx.fillStyle = "#FF0000";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

draw();
async function CallSteamApi(name) {
    const url = 'https://steam-game-search-and-details.p.rapidapi.com/game_search/search_like/title/?search_value='+ name ;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8c1ee96b34msh8023d55e76fd031p149f5bjsn9a07ea8e25bc',
            'X-RapidAPI-Host': 'steam-game-search-and-details.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        displayGames (result) 
    } catch (error) {
        console.error(error);
    }
}

function displayGames (gameList) {
    var gameListHolder = document.querySelector ("#gameList") 
    console.log(gameListHolder) 
    for (var i = 0;i<gameList.length; i++) {
        var game = gameList[i]
        console.log(game)
        var gameHolder = document.createElement ("div")
        gameHolder.textContent = game.title
        gameListHolder.append(gameHolder)
    }
}

CallSteamApi("Space Invaders");