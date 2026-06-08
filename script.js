const player = document.getElementById("player");
const game = document.getElementById("game");
const scoreText = document.getElementById("score");

let playerX = 370;
let score = 0;

document.addEventListener("keydown", (e)=>{

    if(e.key==="ArrowLeft" && playerX > 0){
        playerX -= 20;
    }

    if(e.key==="ArrowRight" && playerX < 740){
        playerX += 20;
    }

    player.style.left = playerX + "px";
});

function createItem(){

    const item = document.createElement("div");
    item.classList.add("item");

    const sustainable = Math.random() > 0.3;

    item.innerHTML = sustainable ? "🍎" : "🗑️";

    item.dataset.type = sustainable ? "good" : "bad";

    item.style.left = Math.random()*750 + "px";
    item.style.top = "0px";

    game.appendChild(item);

    let fall = 0;

    const interval = setInterval(()=>{

        fall += 5;
        item.style.top = fall + "px";

        const itemX = parseInt(item.style.left);

        if(
            fall > 430 &&
            itemX > playerX - 40 &&
            itemX < playerX + 40
        ){

            if(item.dataset.type==="good"){
                score += 10;
            }else{
                score -= 5;
            }

            scoreText.textContent = score;

            item.remove();
            clearInterval(interval);
        }

        if(fall > 500){
            item.remove();
            clearInterval(interval);
        }

    },30);
}

setInterval(createItem,1000);