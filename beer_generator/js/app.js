const imageContainer = document.querySelector('.image-container')
const beerButton = document.querySelector('#beer-button');
const randomBeerTitle = document.querySelector('#random-beer');
const randomBeerDecription = document.querySelector('#description');
const randomBeerABV = document.querySelector('.abv');
const randomBeerPH = document.querySelector('.ph');
const beerImage = document.querySelector('#beer-image');

function getData() {
    fetch('https://api.punkapi.com/v2/beers/random')
        .then(response => response.json())
        .then(data => {

            const name = data[0].name;
            const description = data[0].description;
            const abv = data[0].abv;
            const pH = data[0].ph;

            randomBeerTitle.textContent = name;
            randomBeerDecription.textContent = description;
            randomBeerABV.textContent = 'ABV: ' + abv;
            randomBeerPH.textContent = 'pH: ' + pH;
            beerImage.setAttribute('src', data[0].image_url)
        })
};

beerButton.addEventListener('click', getData);

getData();
