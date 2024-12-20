const grid = document.querySelector('.grid')

let boarwidth = 560
let boarheight = 300
let barwidth = 100
let barheight = 20
let ballDiameter = 20


let xDirection = 2
let yDirection = 2

/// create bars 

class Blocks {
    constructor(xAxyis, yAxyis) {
        this.bottomleft = [xAxyis, yAxyis]
        this.bottomRight = [xAxyis + barwidth, yAxyis]
        this.topleft = [xAxyis + barwidth, yAxyis + barheight]
        this.topright = [xAxyis, yAxyis + barheight]

    }
}


let blocks = [
    new Blocks(10, 270),
    new Blocks(120, 270),
    new Blocks(230, 270),
    new Blocks(340, 270),
    new Blocks(450, 270),

    new Blocks(10, 240),
    new Blocks(120, 240),
    new Blocks(230, 240),
    new Blocks(340, 240),
    new Blocks(450, 240),

    new Blocks(10, 210),
    new Blocks(120, 210),
    new Blocks(230, 210),
    new Blocks(340, 210),
    new Blocks(450, 210),
]



for (i = 0; i < blocks.length; i++) {
    let brokBlocks = document.createElement('div')
    brokBlocks.className = 'brokBlock'
    grid.appendChild(brokBlocks)
    brokBlocks.style.left = `${blocks[i].bottomleft[0]}px`
    brokBlocks.style.bottom = `${blocks[i].bottomRight[1]}px`
}

// draw users
function drawUser() {
    user.style.left = `${currentpositionuser[0]}px`
    user.style.bottom = `${currentpositionuser[1]}px`
}

// draw ball 
function drawBall() {
    ball.style.left = `${currentPosition[0]}px`
    ball.style.bottom = `${currentPosition[1]}px`
}
// create user
const userPosition = [260, 10]
let currentpositionuser = userPosition

// creat ball
const ballposition = [230, 20]
let currentPosition = ballposition

const user = document.createElement('div')
user.className = 'user'
grid.appendChild(user)
drawUser()


const ball = document.createElement('div')
ball.className = 'ball'
grid.appendChild(ball)
drawBall()



// move user 
function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentpositionuser[0] > 0) {
                currentpositionuser[0] -= 10
                drawUser()
            }
            break;

        case 'ArrowRight':
            if (currentpositionuser[0] < (boarwidth - barwidth)) {
                currentpositionuser[0] += 10
                drawUser()
            }
            break;

    }
}

document.addEventListener('keydown', moveUser)



// move ball 
function moveBall() {
    currentPosition[0] += xDirection
    currentPosition[1] += yDirection
    drawBall()
    checkForcollection()
}
let indervalId

indervalId = setInterval(moveBall, 30)



// function for check collecton 

function checkForcollection() {
    for (i = 0; i < blocks.length; i++) {
        if (
            currentPosition[0] > blocks[i].bottomleft[0] &&
            currentPosition[0] < blocks[i].bottomRight[0] &&
            currentPosition[1] > blocks[i].bottomleft[1] &&
            currentPosition[1] < blocks[i].topright[1]
        ) {
            let allBlocks = document.querySelectorAll('.brokBlock')
            allBlocks[i].classList.remove('brokBlock')
            blocks.splice(i, 1)
            changeDirection()

        }

    }
    // check for wall colleciton
    if (currentPosition[0] >= (boarwidth - ballDiameter) || currentPosition[0] <= 0 || currentPosition[1] >= (boarheight - ballDiameter)) {
        changeDirection()
    }


    if (currentPosition[1] <= 0) {
        changeDirection()
    }

    // check for user collection
    if(currentPosition[0] > currentpositionuser[0]&& currentPosition[0] < (currentpositionuser[0]+barwidth) && currentPosition[1]> currentpositionuser[1]&& currentPosition[1] <(currentpositionuser[1]+ barheight)){
        changeDirection()

    }

}


function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === - 2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }

}

