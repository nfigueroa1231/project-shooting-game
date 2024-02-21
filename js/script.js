document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.getElementsByClassName("gameContainer")[0];
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");


    let player1X = 50;
    let player1Y = 500;
    let player1Jumping = false;
    let player1Shooting = false;

    let player2X = 1100;
    let player2Y = 500;
    let player2Jumping = false;
    let player2Shooting = false;



    function updatePlayers() {
        player1.style.left = player1X + "px";
        player1.style.top = player1Y + "px";

        player2.style.left = player2X + "px";
        player2.style.top = player2Y + "px";
    }


    function createShot(player) {
        const shotElement = document.createElement("div");
        shotElement.className = "shot";
        shotElement.style.left = (parseInt(player.style.left) + (player === player1 ? 50 : -5)) + "px"; // Adjust left position
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
                    handleCollision(player2);
                } else if (player === player2 && isColliding(player1Rect, shotRect)) {
                    handleCollision(player1);
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
        return !(rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom);
    }

    function handleCollision(playerHit) {
        // Handle collision with the opposing player (e.g., reduce health, etc.)
        // For now, just remove the shot element
        gameContainer.removeChild(shotElement);
        player1Shooting = false;
        player2Shooting = false;
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
        
            document.addEventListener("keydown", function (event) {
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
            });
            updatePlayers();
        })
    