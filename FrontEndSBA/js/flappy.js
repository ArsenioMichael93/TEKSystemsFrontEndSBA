const block = document.getElementById("block")
const hole = document.getElementById("hole")
var bird = document.getElementById("bird")
var flapping = 0;
let flapscore = 0

hole.addEventListener('animationiteration', () => {
    const random = Math.random() * 3;
    var top = (random*100)+150;
    hole.style.top = -(top) + "px";
    flapscore++;
})

setInterval(function () {
    var birdtop =
        parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
    if (flapping == 0) {
        bird.style.top = (birdtop + 2) + "px"
    }
    var blockleft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holetop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var btop = -(500-birdtop);
    if((birdtop>480)||((blockleft<20)&&(blockleft>-50)&&((btop<holetop)||(btop>holetop+130)))){
        document.getElementById('gameFlap').innerHTML = 'Your Score is : ' + flapscore;
        document.getElementById('gameFlap').style.fontSize="x-large";
        document.addEventListener('keyup', event => {
            if (event.code === 'Space') {
                console.log('Space pressed');
            }
        })
        bird.style.top = 100 + "px"
        flapscore = 0;
    }
}, 10);

function flap() {
    flapping = 1;
    let flapCount = 0;
    var flapinterval = setInterval(function(){
        var birdtop =
            parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
        if((birdtop>6)&&(flapCount<15)){
            bird.style.top = (birdtop -4) + "px"
        }
        if(flapCount>20){
            clearInterval(flapinterval);
            flapping = 0;
            flapCount = 0;
        }
        flapCount ++;
    },10);
}