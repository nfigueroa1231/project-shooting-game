
const gameContainer = document.getElementById('gameContainer')
let introScreen =  document.getElementById('game-intro')
let gameEndScreen = document.getElementById('game-end')
let startButton = document.getElementById('start-button')
let restartButton = document.getElementById('restart-button')
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
let life1 = document.getElementById('lifeBar1')
let life2 = document.getElementById('lifeBar2')

let result = document.getElementById('result')

let player1X 
let player1Y 
let player1Jumping
let player1Shooting 

let player2X
let player2Y 
let player2Jumping 
let player2Shooting 

let player1Life 
let player2Life 

let isGameOver 


startButton.addEventListener('click', () => {
    startingButton()
})

document.addEventListener("keydown", isGameOverReally)



function startingButton() {
    document.addEventListener("keydown", isGameOverReally)
    player1X = 200;
    player1Y = 700;
    player1Jumping = false;
    player1Shooting = false;
    
    player2X = 1400;
    player2Y = 700;
    player2Jumping = false;
    player2Shooting = false;
    
    player1Life = 100
    player2Life = 100
    
    isGameOver = false 
    window.scrollTo(0, 0)
    console.log("STARTING!!!")
    introScreen.style.visibility = 'hidden'
    introScreen.style.height = '0'

    gameEndScreen.style.visibility = 'hidden'
    gameEndScreen.style.height = '0'
    
    gameContainer.style.visibility = 'inherit'
    gameContainer.style.width = '76vw'
    gameContainer.style.height = '50vh';
    gameContainer.style.padding = '200px'

    life1.style.width = `${player1Life}%`
    life2.style.width = `${player2Life}%`

    updatePlayers()
    
}


function updatePlayers() {
    console.log("UPDATING")
    player1.style.left = player1X + "px";
    player1.style.top = player1Y + "px";

    player2.style.left = player2X + "px";
    player2.style.top = player2Y + "px";
}


function createShot(player) {
    const shotElement = document.createElement("div");
    shotElement.className = "shot";
    shotElement.style.left = (parseInt(player.style.left) + (player === player1 ? 50 : -50)) + "px"; // Adjust left position
    shotElement.style.top = (parseInt(player.style.top) + 25) + "px";
    gameContainer.appendChild(shotElement);

    const shotSpeed = (player === player1 ? 5 : -5); // Adjust shot speed and direction

    function moveShot() {
        const currentLeft = parseInt(shotElement.style.left);
        if ((player === player1 && currentLeft < gameContainer.offsetWidth) ||
            (player === player2 && currentLeft > 0)) {
            shotElement.style.left = (currentLeft + shotSpeed) + "px"; // Adjust left position
            // Check for collision with the opposing player
            const player1Rect = player1.getBoundingClientRect();
            const player2Rect = player2.getBoundingClientRect();
            const shotRect = shotElement.getBoundingClientRect();

            if (player === player1 && isColliding(player2Rect, shotRect)) {
                // gameContainer.removeChild(shotElement);
                handleCollision(player2, gameContainer, shotElement);
            } else if (player === player2 && isColliding(player1Rect, shotRect)) {
                // gameContainer.removeChild(shotElement);
                handleCollision(player1, gameContainer, shotElement);
            } else {
                requestAnimationFrame(moveShot);
            }
        } else {
            gameContainer.removeChild(shotElement);
            player1Shooting = false;
            player2Shooting = false;
        }
    }

    requestAnimationFrame(moveShot);
}

function isColliding(rect1, rect2) {
    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
}

function handleCollision(player, gameContainer, shot) {
    console.log("Player who is it", player)


    if (player.id === 'player1') {
        console.log("PLAYER 1 SHOT!!!")
        player1Life -= 16.7
        // player2Life += 8.35
        if (player1Life <= 0) {
            // life1.remove()
            player1Life = 0
            player2Life = 100
            gameOver()
        }
        life1.style.width = `${player1Life}%`
        life2.style.width = `${player2Life}%`
        player2Shooting = false;
    } else {
        player2Life -= 16.7
        // player1Life += 8.35
        if (player2Life <= 0) {
            // life2.remove()
            player2Life = 0
            player1Life = 100
            gameOver()
        }
        life1.style.width = `${player1Life}%`
        life2.style.width = `${player2Life}%`
        player1Shooting = false;
    }

    gameContainer.removeChild(shot);

}


function jump(player, jumpingState) {
    if (!jumpingState) {
        jumpingState = true;
        let jumpHeight = 100;

        function moveUp() {
            player.style.top = (parseInt(player.style.top) - 5) + "px";

            if (parseInt(player.style.top) > player1Y - jumpHeight) {
                requestAnimationFrame(moveUp);
            } else {
                jumpingState = false;
                requestAnimationFrame(moveDown);
            }
        }

        function moveDown() {
            player.style.top = (parseInt(player.style.top) + 5) + "px";

            if (parseInt(player.style.top) < player1Y) {
                requestAnimationFrame(moveDown);
            } else {
                player.style.top = player1Y + "px";
            }
        }

        requestAnimationFrame(moveUp);
    }
}

function gameOver() {
    window.scrollTo(0, 0)
    console.log("GAME OVER!!!!")
    isGameOver = true
    document.removeEventListener('keydown', isGameOverReally, true)
    gameContainer.style.visibility = 'hidden'
    gameContainer.style.height = '0'
    gameContainer.style.padding = '0px'

    gameEndScreen.style.visibility = 'inherit'
    gameEndScreen.style.height = '80vh'

    

    if (player1Life <= 0) {
        result.innerText = `The Robot won!  The Cowboy will come back to fight another day...`
    } else {
        result.innerText = `The Cowboy won!  The Robots may resume their invasion another day...`
    }

    
}

function isGameOverReally(event) {
    if (isGameOver) {
        return true
    }

    //player 2 controls
    switch (event.key) {
        case "ArrowUp":
            jump(player2, player2Jumping);
            break;
        case "ArrowRight":
            player2X = Math.min(player2X + 30, gameContainer.offsetWidth - 50);
            break;
        case "ArrowLeft":
            player2X = Math.max(player2X - 30, 0);
            break;
        case "Enter":
            player2Shooting = true;
            createShot(player2);
            break;



        //player 1 controls

        case "w":
            jump(player1, player1Jumping);
            break;
        case "d":
            player1X = Math.min(player1X + 30, gameContainer.offsetWidth - 50);
            break;
        case "a":
            player1X = Math.max(player1X - 30, 0);
            break;
        case "Shift":
            player1Shooting = true;
            createShot(player1);
            break;
    }
    updatePlayers();
}



restartButton.addEventListener('click', () => {
    console.log("RESTARTING!!!!")
    // window.location.reload()
    startingButton()
})





