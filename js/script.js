document.addEventListener("DOMContentLoaded", function () {
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");

    let player1X = 50;
    let player1Y = 50;

    let player2X = 50;
    let player2Y = 50;

    function updatePlayers() {
        player1.style.left = player1X + "px";
        player1.style.top = player1Y + "px";

        player2.style.left = player2X + "px";
        player2.style.top = player2Y + "px";
    }

    document.addEventListener("keydown", function (event) {
        switch (event.key) {
            case "ArrowUp":
                player1Y -= 10;
                break;
            case "ArrowLeft":
                player1X -= 10;
                break;
            case "ArrowRight":
                player1X += 10;
                break;
            
            // player2
            case "w":
                player2Y -= 10;
                break;
           
            case "a":
                player2X -= 10;
                break;
            case "d":
                player2X += 10;
                break;
        }
        updatePlayers();
    });

    updatePlayers();
});


  