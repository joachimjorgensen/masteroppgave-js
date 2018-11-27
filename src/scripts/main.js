/**
 * Created by jwjorgen on 29/10/2018.
 */
const path = require('path');
const url = require('url');

let database = {
    allFileName: '',
    tasks: []
};

let taskCount = 0;
let currentId= 0;

let loadMain = function(){
    /*
    const downloadFolder = document.getElementById('downloadFolder');
    filepath = path.join(__dirname, '../../../../');
    var nameArray = filepath.split('/');

    downloadFolder.innerHTML = ".../" + nameArray[nameArray.length - 2] + "/" + nameArray[nameArray.length - 1];
    */
  
    // Load all tasks in the database
    loadTaskList();

    // Hide paper until the user chooses a task
    let papers = document.getElementsByClassName('paper');
    for (let i = 0; i < papers.length; i++) {
        papers[i].style.display = 'none';
    }

};


let loadDistractors = function() {

    let distractorListContainer = document.getElementById('distractorListContainer');

    // Remove List elements
    while (distractorListContainer.firstChild) {
        distractorListContainer.removeChild(distractorListContainer.firstChild);
    }

    let id = currentId;
    let allTasks = database.tasks;

    for (let taskNum in allTasks) {

        let task = allTasks[taskNum];

        if (task.id == id) {

            let allDistractors = task.distractors;

            for(let distractorNum in allDistractors) {

                let distractor = allDistractors[distractorNum];

                let distractorTextContainer = document.createElement('div');
                distractorTextContainer.className = 'distractorTextContainer';

                let distractorText = document.createElement('p');
                distractorText.innerHTML = distractor;

                distractorTextContainer.appendChild(distractorText);

                distractorListContainer.appendChild(distractorTextContainer);
            }

        }
    }
};



let addDistractor = function() {

    // Stop the page from refreshing on submit
    event.preventDefault();

    let id = currentId;

    let distractor = document.forms["distractorForm"]["distractorInput"].value;

    let allTasks = database.tasks;

    for (let taskNum in allTasks) {

        let task = allTasks[taskNum];

        if (task.id == id) {

            task.distractors.push(distractor);

        }
    }

    // Empty the input field on submit
    document.forms["distractorForm"]["distractorInput"].value = '';

    loadDistractors();
};


/**
 * Delete task from list of tasks
 */
let deleteTask = function() {
    let id = currentId;
    let newTaskList = [];
    let allTasks = database.tasks;
    let firstId = 1000000;

    for (let taskNum in allTasks) {

        let task = allTasks[taskNum];

        if (task.id != id) {

            // Keep track of the first element id in the list
            firstId = task.id < firstId ? task.id : firstId;

            newTaskList.push(task);
        }
    }

    database.tasks = newTaskList;
    loadTaskList();

    if (firstId < 1000000) {
        loadTask(firstId);
    } else {
        // Hide paper until the user chooses a task
        let papers = document.getElementsByClassName('paper');
        for (let i = 0; i < papers.length; i++) {
            papers[i].style.display = 'none';
        }
    }
};


/**
 * Save current task to the database
 * @param id
 */
let saveTask = function(id) {

    let code = editor.getValue();
    let fileName = getFileName();
    let parsons2d = getParsons2d();
    let title = getTitle();

    let allTasks = database.tasks;

    for (let taskNum in allTasks) {

        let task = allTasks[taskNum];

        if(task.id==id){
            task = {
                ...task,
                title: title,
                code: code || '',
                fileName: fileName,
                parsons2d: parsons2d
            };

            allTasks[taskNum] = task;
        }
    }

    updateTitleInTaskList(id);

};


/**
 * Update the oppgave-title in the task list
 * @param id
 */
let updateTitleInTaskList = function(id) {

    let allTasks = database.tasks;
    let taskList = document.getElementById('taskList');

    for (let taskNum in allTasks) {

        let task = allTasks[taskNum];

        let taskTab = document.getElementById(task.id.toString());

        if(task.id==id){

            if (task.title) {

                taskTab.firstElementChild.innerHTML = task.title;

            }

        }
    }
};


/**
 * Update the list of tasks in the TaskList
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
        taskListEntry.id = task.id.toString();
        taskListEntry.setAttribute('onclick', 'loadTask(' + task.id + ')');

        let taskTitle = document.createElement('p');
        taskTitle.className = 'taskText';
        taskTitle.innerHTML = task.title ? task.title : 'Task ' + (task.id + 1);

        taskListEntry.appendChild(taskTitle);
        taskList.appendChild(taskListEntry);

    }
};


/**
 * Update the input fields to the values of current task
 * @param id
 */
let loadTask = function(id) {

    // Show paper
    let papers = document.getElementsByClassName('paper');
    for (let i = 0; i < papers.length; i++) {
        papers[i].style.display = 'block';
    }


    currentId = id;

    let allTasks = database.tasks;

    for (let taskNum in allTasks) {

        let task = allTasks[taskNum];

        let taskTab = document.getElementById(task.id.toString());

        if(task.id==id){

            taskTab.className = 'taskContainer selected';

            document.getElementById('taskTitleInput').value = task.fileName;
            document.getElementById('parsons2d').checked = task.parsons2d;
            editor.refresh();
            editor.setValue(task.code);

        }else{
            taskTab.className = 'taskContainer';

        }
    }

    saveToQti();
    loadDistractors();
};


/**
 * Returns a task given an id
 * @param id
 * @returns {*}
 */
let getTaskObject = function(id) {

    let allTasks = database.tasks;

    for (let taskNum in allTasks) {
        let task = allTasks[taskNum];
        if (task.id == id) {
            return task;
        }
    }

    return 'Error: no task do not exist';
};


/**
 * Save the code to QTI format?
 * @param code
 */
let saveToQti = function() {
    saveTask(currentId);
    //let textArea = document.getElementById('textArea');
    //textArea.innerHTML = editor.getValue();
};


/**
 * Download a single task to QTI format?
 * @param code
 */
let downloadSingle = function() {

    let filepath = chooseDownloadFolder();

    let task = getTaskObject(currentId);
    let fileName = task.fileName;

    if (!fileExists(fileName+'.zip')) {
        run_dnd(task, filepath, task.fileName);

        //let jsonString = JSON.stringify(data);
        //let requestDiv = document.getElementById('serverResponse');
        //requestDiv.innerHTML = jsonString;
    }
};


/**
 * Download all tasks to QTI format?
 * @param code
 */
let downloadAll = function() {

    let filepath = chooseDownloadFolder();

    let allFileName = database.allFileName;

    if (!fileExists(allFileName+'.zip')) {
        let data = database.tasks;
        run_dnd(data, filepath, allFileName);
    }
};


/**
 *
 */
let chooseDownloadFolder = function(){

    const {dialog} = require('electron').remote;
    //var nameArray;
    /*let filepath = dialog.showOpenDialog({
        properties: ['openDirectory']
    });*/

    dialog.showSaveDialog((filepath) => {
        if (filepath === undefined){
            console.log("You didn't save the file");
            return;
        }

        return filepath;
    });

    /*
    console.log(currentTask.downloadPath);
    if(!filepath){
        filepath = path.join(__dirname, '../../../../');
        nameArray = filepath.split('/');
    }else{
        nameArray = filepath[0].split('/');
    }

    downloadFolder.innerHTML = ".../"+nameArray[nameArray.length-2]+"/"+nameArray[nameArray.length-1];
    */
};


/**
 * Return the chosen fileName. If none selected, 'default' is returned
 *
 * @returns {string}
 */
let getFileName = function() {

    let fileName = document.getElementById('taskTitleInput').value
        ? document.getElementById('taskTitleInput').value
        : '';

    return fileName;
};


/**
 * Return the chosen fileName. If none selected, 'default' is returned
 *
 * @returns {string}
*/
let getFilePath = function() {

    return filepath;
};


/**
 * Return the chosen fileName. If none selected, 'default' is returned
 *
 * @returns {string}
 */
let getTitle = function() {

    return document.getElementById('taskTitleInput').value;
};



/**
 * Checks if the parsons2d box is checked
 *
 * @returns {boolean|Array|string|ga.selectors.pseudos.checked|*}
 */
let getParsons2d = function () {

    let parsons2d = document.getElementById('parsons2d').checked;

    return parsons2d;
};


/**
 * Add empty  task to list of tasks
 */
let addTask = function () {

    let id = taskCount;

    let task = {
        id: id,
        title: '',
        code: '',
        fileName: '',
        parsons2d: true,
        distractors: []
    };

    database.tasks.push(task);

    taskCount++;

    loadTaskList();

    // Load task
    loadTask(id);

};


/**
 * Update file name for all-tasks.zip
 * @param allFileName
 */
let updateAllTasksTitle = function (allFileName) {
    database.allFileName = allFileName;
};