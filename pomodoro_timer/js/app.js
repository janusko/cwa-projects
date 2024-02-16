const taskContainer = document.querySelector('.task-container');
const submitButton = document.querySelector('.submit-button');
const timeLeftDisplay = document.querySelector('#time-left');
const sliderFill = document.querySelector('.fill');


// COUNTDOWN VARIABLES
const startCount = 25 * 60;
let timeLeft = startCount;
let timerId;


let tasks = [];


// sort by priority
const descendingTasks = tasks.sort((taskA, taskB) => taskA.priority - taskB.priority);
console.log(descendingTasks);


// CONVERT TO MINUTES
function convertToMin(secondsLeft) {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft - minutes * 60;
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};


// HANDLE CLICKS
function handleClick(button) {
    switch(button.textContent) {
        case 'ACTIVE' :
            button.textContent = "PAUSED";
            clearInterval(timerId);
            break;
        case "PAUSED" :
            button.textContent = "ACTIVE";
            countdown(button);
            break;
        default :
            const allButtons = document.querySelectorAll('.controller-button');
            allButtons.forEach(button => {
                button.textContent = "START";
                button.classList.remove('active-button');
                clearInterval(timerId);
                timeLeft = startCount;
                timeLeftDisplay.textContent = convertToMin(timeLeft);
            });
        
            button.textContent = "ACTIVE";
            button.classList.add('active-button');
            countdown(button);
            break;
    }
};


// COUNTDOWN
function countdown(button) {
    timerId = setInterval(() =>  {
        timeLeft--;
        timeLeftDisplay.textContent = convertToMin(timeLeft);
        sliderFill.style.width = (timeLeft / startCount) * 100 + '%';

        if (timeLeft <= 0) {
            clearInterval(timerId);
            delete descendingTasks[button.id];
            button.parentNode.remove();

            // reset the timer
            timeLeft = startCount;
            timeLeftDisplay.textContent = convertToMin(timeLeft);
        }
    }, 1000);
};


// RENDER
function render() {
    // RENDERING TASKS ARRAY
    descendingTasks.forEach((task, index) => {

        // CREATING A CONTAINING DIV
        const taskBlock = document.createElement('div');
        taskBlock.classList.add('task-block');
    
        // CREATE TASK ELEMENTS
        const deleteIcon = document.createElement('p');
        deleteIcon.classList.add('delete-icon');
        deleteIcon.textContent = '✘';
  
        const taskTitle = document.createElement('p');
        taskTitle.textContent = task.name;
    
        const controllerButton = document.createElement('button');
        controllerButton.classList.add('controller-button');
        controllerButton.textContent = 'START';
        controllerButton.setAttribute('id', index);
        // giving each task an id to pass index as parameter --> find by id in descendingTasks --> handleClick()
        controllerButton.addEventListener('click', () => handleClick(controllerButton));
    
        // DELETE ICON
        deleteIcon.addEventListener('click', deleteTask);
    
        // APPENDING
        taskBlock.append(deleteIcon, taskTitle, controllerButton);
        taskContainer.append(taskBlock);
    })
};
render();


// DELETE TASK
function deleteTask(e) {
    e.target.parentNode.remove();
    const lastChildId = e.target.parentNode.lastChild.id;
    delete descendingTasks[lastChildId];
    clearInterval(timerId);
    timeLeft = startCount;
    timeLeftDisplay.textContent = convertToMin(timeLeft);
};


// ADD INDIVIDUAL TASK
function addTask() {
    const inputElement = document.querySelector('input');
    const value = inputElement.value;

    if (value) {
        taskContainer.innerHTML = '';
        inputElement.value = '';
        tasks.push({
            name: value,
            priority: tasks.length
        });
    render();
    }

    console.log(tasks);
};


submitButton.addEventListener('click', addTask);
