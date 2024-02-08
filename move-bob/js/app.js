const bob = document.querySelector('.bob');
const eyes = document.querySelector('.eye-container');


// need to accumulate the total number of times the arrow is pressed.
let left = 100;
let bottom = 100;

function moveRight() {
    left += 100;
    bob.style.left = left + 'px';
    eyes.style.transform = 'rotate(0deg)'
    eyes.style.left = '60px';
}

function moveLeft() {
    left -= 100;
    bob.style.left = left + 'px';
    // want to rotate eyes around.
    eyes.style.transform = 'rotate(180deg)'
    eyes.style.left = '-60px';
}

function moveUp() {
    bottom += 100;
    bob.style.bottom = bottom + 'px';
}

function moveDown() {
    bottom -= 100;
    bob.style.bottom = bottom + 'px';
}


function moveBob(e) {
    console.log('pressing key: ', e.key)

    if (e.key === "ArrowLeft") {
        // move Bob left
        moveLeft()

    }

    if (e.key === "ArrowRight") {
        // move Bob right
        moveRight()
    }

    if (e.key === "ArrowUp") {
        // move Bob up
        moveUp()
    }

    if (e.key === "ArrowDown") {
        // move Bob down
        moveDown()
    }
}

document.addEventListener('keydown', moveBob);
