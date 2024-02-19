const mouth = document.querySelector('#mouth');
const emotionElements = document.querySelectorAll('.rating-container div');

function selectEmotion(e) {
    console.log('clicked', e.target.id);
    mouth.classList.remove("happy-mouth", "sad-mouth", "indifferent-mouth");
    const chosenEmotion = e.target.id;

    if (chosenEmotion === "bad") {
        mouth.classList.add("sad-mouth");
    }
    if (chosenEmotion === "okay") {
        mouth.classList.add("indifferent-mouth");
    }
    if (chosenEmotion === "good") {
        mouth.classList.add("happy-mouth");
    }
}

emotionElements.forEach(emotionElement => 
    emotionElement.addEventListener('click', selectEmotion)
    );
