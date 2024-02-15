const primaryInput = document.querySelector('#primary-input');
const secondaryInput = document.querySelector('#secondary-input');
const primarySelect = document.querySelector('#primary-units');
const secondarySelect = document.querySelector('#secondary-units');

primaryInput.value = 0;
secondaryInput.value = 0;

function update(e) {
    const elementId = e.target.id;
    if (elementId === 'secondary-input') {
        primaryInput.value = calculate(secondarySelect.value, primarySelect.value, secondaryInput.value);
    } else {
        secondaryInput.value = calculate(primarySelect.value, secondarySelect.value, primaryInput.value);
    }
}


function calculate(firstTempUnit, secondTempUnit, temp) {
    // if the units are changed to be the same
    if (firstTempUnit === secondTempUnit) {
        return temp;
    }

    const combination = firstTempUnit + '-' + secondTempUnit;
    let result;

    switch (combination) {
        //// TO CELCIUS
        // convert fahrenheit to celcius
        case 'fahrenheit-celcius':
            // C = (F-32) * 5/9
            result = (Number(temp) - 32) * 5/9;
            break;

        // convert kelvin to celcius
        case 'kelvin-celcius':
            // C = K - 273.15
            result = Number(temp) - 273.15;
            break;

        //// TO FAHRENHEIT
        // convert celcius to fahrenheit
        case 'celcius-fahrenheit':
            // F = (C * 9/5) + 32
            result = (Number(temp) * 9/5) + 32;
            break;

        // convert kelvin to fahrenheit
        case 'kelvin-fahrenheit':
            // F = (K - 273.15) * 9/5 + 32
            result = (Number(temp) - 273.15) * 9/5 + 32;
            break;

        //// TO KELVIN 
        // convert fahrenheit to kelvin
        case 'fahrenheit-kelvin':
            // K = (F - 32) * 5/9 + 273.15
            result = (Number(temp) - 32) * 5/9 + 273.15;
            break;

        // convert celcius to kelvin
        case 'celcius-kelvin': 
            // K = C + 273.15;
            result = Number(temp) + 273.15;
            break
    }
    return parseFloat(result.toFixed(2));
}


[primaryInput, secondaryInput, primarySelect, secondarySelect].forEach(element => 
    element.addEventListener('change', update)
);
