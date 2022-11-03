//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector('.add-element__text');//Add a new task.
var addButton=document.querySelectorAll('.button')[0];//first button
var incompleteTaskHolder=document.querySelector('.todo-block__list--incomplete');//ul of #incomplete-tasks
var completedTasksHolder=document.querySelector('.todo-block__list--completed');//completed-tasks


var createNewElement = ({
    tagName,
    classList,
    srcName,
    textContent,
    typeName,
    altName,
}) => {
    var newBlock = document.createElement(tagName);
    if (classList) newBlock.setAttribute('class', classList);
    if (typeName) newBlock.type = typeName;
    if (srcName) newBlock.src = srcName;
    if (textContent) newBlock.innerText = textContent;
    if (altName) newBlock.setAttribute('alt', altName);
    return (newBlock)
}

//New task list item
var createNewTaskElement = function(taskString){

    var listItem = createNewElement({
        tagName: 'li',
        classList: 'todo-block__item item',
    });

    var checkBox = createNewElement({
        tagName: 'input',
        classList: 'item__checkbox',
        typeName: 'checkbox',
    });

    var label = createNewElement({
        tagName: 'label',
        classList: 'item__label task',
        textContent: taskString,
    });
    
    var editInput = createNewElement({
        tagName: 'input',
        classList: 'item__input task',
        typeName: 'text',
    })

    var editButton = createNewElement({
        tagName: 'button',
        classList: 'button item__edit',
        textContent: 'Edit',
    });
    
    var deleteButton = createNewElement({
        tagName: 'button',
        classList: 'button item__delete',
    });

    var deleteButtonImg = createNewElement({
        tagName: 'img',
        classList: 'item__delete-img',
        srcName: './remove.svg',
        altName: 'delete img',
    });

    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask = function(){
    console.log('Add Task...');
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value='';

}

//Edit an existing task.

var editTask = function(){
    var listItem = this.parentNode;
    var editInput = listItem.querySelector('.item__input');
    var label = listItem.querySelector('.item__label');
    var editBtn = listItem.querySelector('.item__edit');
    var containsClass = listItem.classList.contains('edit-mode');
    //If class of the parent is .edit-mode
    if (containsClass) {
        //switch to .edit-mode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = 'Edit';
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = 'Save';
    }

    //toggle .edit-mode on the parent.
    listItem.classList.toggle('edit-mode');
};


//Delete task.
var deleteTask = function(){
    console.log('Delete Task...');

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted = function() {
    console.log('Complete Task...');
    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
    console.log('Incomplete Task...');
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks.
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest=function() {
    console.log('AJAX Request');
}

//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);


var bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
    console.log('bind list item events');
//select ListItems children
    var checkBox = taskListItem.querySelector('.item__checkbox');
    var editButton = taskListItem.querySelector('.item__edit');
    var deleteButton = taskListItem.querySelector('.item__delete');

    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++ ) {

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.