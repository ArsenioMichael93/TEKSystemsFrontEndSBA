const Dino = document.getElementById("Dino");
const Cacti = document.getElementById("Cacti");
let DinoScore = 0

function jump() {
    if (Dino.classList != "animate") { Dino.classList.add("animate"); }
    setTimeout(function () {
        Dino.classList.remove("animate");
    }, 500);

}


const checkdead = setInterval(function () {
    const Dinotop =
        parseInt(window.getComputedStyle(Dino).getPropertyValue("top"));
    const Cactileft =
        parseInt(window.getComputedStyle(Cacti).getPropertyValue("left"));
    DinoScore++
    if (Cactileft < 20 && Cactileft > 0 && Dinotop >= 230) {
        document.getElementById('gameDino').innerHTML = 'Your Score is : ' + DinoScore;
        document.getElementById('gameDino').style.fontSize="x-large";
                Dino.style.top = 400 + "px"
                Cacti.style.left = 680 + "px"
                DinoScore = 0
        document.addEventListener('keyup', event => {
            if (event.code === 'Space') {
                console.log('Space pressed');
            }
        })
    }


}, 10);