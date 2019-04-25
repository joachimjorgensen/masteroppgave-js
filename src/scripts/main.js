/**
 * Created by jwjorgen on 29/10/2018.
 */

const path = require('path');
const url = require('url');

/**
 * "Database" containing the tasks
 */
let database = {
    allFileName: '',
    tasks: []
};

// Counters
let taskCount = 0;
let currentId= 0;


/**
 * Function that runs on init
 */
let loadMain = function(){
    /*
    const downloadFolder = document.getElementById('downloadFolder');
    filepath = path.join(__dirname, '../../../../');
    var nameArray = filepath.split('/');

    downloadFolder.innerHTML = ".../" + nameArray[nameArray.length - 2] + "/" + nameArray[nameArray.length - 1];
    */
  
    // Load all tasks in the database to the task bar
    loadTaskList();

    //Run all dnd_generator tests
	run_all_dnd_generator_tests();

    // Hide paper until the user chooses a task
    let papers = document.getElementsByClassName('paper');
    for (let i = 0; i < papers.length; i++) {
        papers[i].style.display = 'none';
    }

};


/**
 * Updates the list of tasks in the taskBar
 */
let loadTaskList = function() {

    let allTasks = database.tasks;
    let taskList = document.getElementById('taskList');

    // Remove List elements
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Add tasks to tabList
    for (let taskNum in allTasks) {
        let task = allTasks[taskNum];

        let taskListEntry = document.createElement('div');
        taskListEntry.className = 'taskContainer';
        taskListEntry.id = 'taskContainer' + task.id.toString();
        taskListEntry.setAttribute('onclick', 'loadTask(' + task.id + ')');

        let taskTitle = document.createElement('p');
        taskTitle.className = 'taskText';
        let taskTitleText = task.title ? task.title : 'Task ' + (task.id + 1);
        taskTitle.innerHTML = taskTitleText;

        let taskDeleteButton = document.createElement('button');
        taskDeleteButton.innerHTML = 'X';
        taskDeleteButton.setAttribute('onclick', 'deleteTask(event, ' + task.id + ', "'+ taskTitleText +'")');
        taskDeleteButton.className = 'taskDeleteButton';

        taskListEntry.appendChild(taskTitle);
        taskListEntry.appendChild(taskDeleteButton);
        taskList.appendChild(taskListEntry);
    }
};


/**
 * Update the input fields to the values of current task
 *
 * @param {Number} loadMyId The ID of the task to be loaded
 */
let loadTask = function(loadMyId) {

    // Show paper
    let papers = document.getElementsByClassName('paper');
    for (let i = 0; i < papers.length; i++) {
        papers[i].style.display = 'block';
    }

    // Update global currentID
    currentId = loadMyId;

    let allTasks = database.tasks;

    for (let taskNum in allTasks) {
        let task = allTasks[taskNum];

        let taskTab = document.getElementById('taskContainer' + task.id.toString());

        if(task.id==loadMyId){
            taskTab.className = 'taskContainer selected';

            document.getElementById('taskTitleInput').value = task.fileName;
            document.getElementById('parsons2d').checked = task.parsons2d;
            document.getElementById('IncludePermutationsCheckbox').checked = task.includePermutations;

            // Set task description
            // Because the rich text editors uses nicEditor, this is the way to update their value
            let nicENo = new nicEditors.findEditor('richEditorNo');
            nicENo.setContent(task.description.no);
            let nicEEng = new nicEditors.findEditor('richEditorEng');
            nicEEng.setContent(task.description.eng);
            let nicENyno = new nicEditors.findEditor('richEditorNyno');
            nicENyno.setContent(task.description.nyno);

            // Set source code editor content
            editor.refresh();
            editor.setValue(task.code);
        }else{
            taskTab.className = 'taskContainer';
        }
    }

    saveTask();
    loadDistractors();

    updatePermutationsData(currentId);
};


/**
 * Update file name for all-tasks.zip (Read: The name of the zip folder containing all the tasks)
 *
 * @param {String} allFileName The new name for the zip file
 */
let updateAllTasksTitle = function (allFileName) {
    database.allFileName = allFileName;
};


/**
 * Calclulate the factorial of a number
 *
 * @param {Number} num The number to calculate the factorial of
 * @returns {number} The factorial of the given number
 */
let factorial = function(num) {
    let rval=1;
    for (let i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
};


/**
 * Calculate the number of combinations possible for 'n choose r' (or nCr)
 *
 * @param {Number} n Number of options
 * @param {Number} r Size of subset
 * @returns {number} nCr
 */
let combinations = function(n, r) {

    return (factorial(n) / (factorial(r) * factorial(n - r)))
};
