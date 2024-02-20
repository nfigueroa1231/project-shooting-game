document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.getElementsByClassName("gameContainer")[0];
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");

    let player1X = 50;
    let player1Y = 500;
    let player1Jumping = false;

    let player2X = 1100;
    let player2Y = 500;
    let player2Jumping = false;


    function updatePlayers() {
        player1.style.left = player1X + "px";
        player1.style.top = player1Y + "px";

        player2.style.left = player2X + "px";
        player2.style.top = player2Y + "px";
    }

    function jump(player, jumpingState) {
                if (!jumpingState) {
                    jumpingState = true;
                    let jumpHeight = 80;
        
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
                        jump(player1, player1Jumping);
                        break;
                    case "ArrowRight":
                        player1X = Math.min(player1X + 10, gameContainer.offsetWidth - 50); 
                        break;
                    case "ArrowLeft":
                        player1X = Math.max(player1X - 10, 0);
                        break;
        
                    case "w":
                        jump(player2, player2Jumping);
                        break;
                    case "d":
                        player2X = Math.min(player2X + 10, gameContainer.offsetWidth - 50);      //
                        break;
                    case "a":
                        player2X = Math.max(player2X - 10, 0);
                        break;
                }
        
                updatePlayers();
            });
        
            updatePlayers();
        });










  




