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
};


/**
 * Update file name for all-tasks.zip (Read: The name of the zip folder containing all the tasks)
 *
 * @param {String} allFileName The new name for the zip file
 */
let updateAllTasksTitle = function (allFileName) {
    database.allFileName = allFileName;
};