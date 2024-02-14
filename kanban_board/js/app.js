const taskLists = document.querySelectorAll('.task-list');
const backlogTasks = document.querySelector('#backlog .task-list');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const submitButton = document.querySelector('#submit-button');
const errorContainer = document.querySelector('.error-container');


// hardcode a few tasks in to start
let tasks = [
    {
        id: 0,
        title: "Fix submit button",
        description: "The submit button has stopped working since the last release"
    },
    {
        id: 1,
        title: "Change text on T and C's",
        description: "The terms and coniditons need updating as per the business meeting"
    },
    {
        id: 2,
        title: "Change banner picture",
        description: "Marketing has requested a new banner to be added to the website"
    }
]



taskLists.forEach(taskList => {
    taskList.addEventListener('dragover', dragOver),
    taskList.addEventListener('drop', dragDrop)
});



// CREATE TASKS FUNCTION
function createTask(taskId, title, description) {

    // CREATING A CONTAINING DIV
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-container');


    // TASK HEADER
    const taskHeader = document.createElement('div');
    taskHeader.classList.add('task-header');

    const taskTitle = document.createElement('p');
    taskTitle.textContent = title;

    const deleteIcon = document.createElement('p');
    deleteIcon.textContent = "✘";


    // DELETE ICON
    deleteIcon.addEventListener('click', deleteTask);


    // TASK DESCRIPTION
    const taskDescriptionContainer = document.createElement('div');
    taskDescriptionContainer.classList.add('task-description-container');

    const taskDescription = document.createElement('p');
    taskDescription.textContent = description;


    // ADDING DRAGABILITY & ID
    taskCard.setAttribute('draggable', true);
    taskCard.setAttribute('task-id', taskId);

    taskCard.addEventListener('dragstart', dragStart);


    // APPENDING PARAGRAPH TAGS TO DIVS
    taskHeader.append(taskTitle, deleteIcon);
    taskDescriptionContainer.append(taskDescription);

    // APPENDING DIVS TO TASK CARD
    taskCard.append(taskHeader, taskDescriptionContainer);

    // APPENING TASKCARD TO BACKLOG
    backlogTasks.append(taskCard);
}



function addColor(column) {
    let color
    switch(column) {
        case 'backlog':
            color = 'rgb(96, 96, 192)'
            break
        case 'doing':
            color = 'rgb(83, 156, 174)'
            break
        case 'done':
            color = 'rgb(224, 165, 116)'
            break
        case 'discard':
            color = 'rgb(222, 208, 130)'
            break
        default:
            color = 'rgb(232, 232, 232)'
    }
    return color;
}


function addTasks() {
    tasks.forEach(task => createTask(task.id, task.title, task.description));
}


addTasks()


// DRAG FUNCTIONS
let elementBeingDragged;

function dragStart() {
    elementBeingDragged = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    // CHANGE COLOR
    const columnId = this.parentNode.id;
    elementBeingDragged.firstChild.style.backgroundColor = addColor(columnId);
    this.append(elementBeingDragged);
}



// SHOW ERROR FUNCTION
function showError(message) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.classList.add('error-message');
    errorContainer.append(errorMessage);

    // clearing error message:
    setTimeout(() => {
        errorContainer.textContent = '';
    }, 2000);
}



// ADDING INDIVIDUAL TASK
function addTask(e) {

    e.preventDefault();

    // filter for unique task titles
    const filteredTitles = tasks.filter(task => {
        return task.title === titleInput.value
    });
    if (!filteredTitles.length) {
        const newId = tasks.length;
        tasks.push({
            id: newId,
            title: titleInput.value,
            description: descriptionInput.value
        });

        createTask(newId, titleInput.value, descriptionInput.value);

        titleInput.value = '';
        descriptionInput.value = '';

    } else {
        showError('Title must be unique');
    }
}

submitButton.addEventListener('click', addTask);



// DELETE INDIVIDUAL TASKS
function deleteTask() {
    const headerTitle = this.parentNode.firstChild.textContent;

    // FILTER TASKS
    const filteredTasks = tasks.filter(task => {
        return task.title === headerTitle
    });

    tasks = tasks.filter(task => {
        return task !== filteredTasks[0]
    });

    this.parentNode.parentNode.remove();
}
