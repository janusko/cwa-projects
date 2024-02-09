const colorsContainer = document.querySelector('.colors-container');
const spawnButton = document.querySelector('#spawn-button');

let colorBlocks = ['', '', '', ''] ;


// GET RANDOM NUBMER FUNCTION
function getRandomNumber() {
    return (Math.floor(Math.random() * 255));
}


// SPAWN COLOR FUNCTION
function spawnColors() {
  
    colorsContainer.innerHTML = '';
    // this will clear the previous div contents each time the function is called. Needs to be run before anything else is run in the function.

    // Before divs are created, get rgb numbers:
    const commonColor = getRandomNumber();
    // this will be the first number in rgb, as it will link similar colors for the remaining two rgb numbers

    colorBlocks.forEach((_colorBlock, index) => {
        colorBlocks[index] = 'rgb(' + commonColor + ',' + getRandomNumber() + ',' + getRandomNumber() + ')';
        // the numbers are saved into a string as rgb(commonColor, getRandomNumber(), getRandomNumber())
    })

  
    colorBlocks.forEach(colorBlock => {
        const divElement = document.createElement('div');
        divElement.style.backgroundColor = colorBlock;
        divElement.textContent = colorBlock;
        colorsContainer.append(divElement);
    })
}


// SPACEBAR KEYDOWN
function spawnColorsSpacebar(e) {
    if (e.key === ' ') {
        spawnColors();
    }
}

// call on load for first colorway
spawnColors();

spawnButton.addEventListener('click', spawnColors);
document.addEventListener('keydown', spawnColorsSpacebar);
