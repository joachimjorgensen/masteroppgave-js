/**
 * Created by jwjorgen on 29/10/2018.
 */
const path = require('path');
const url = require('url');

let database = {
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


/**
 * Save current task to the database
 * @param id
 */
let saveTask = function(id) {

    let code = editor.getValue();
    let fileName = getFileName();
    let downloadPath = getFilePath(id);
    let parsons2d = getParsons2d();

    let allTasks = database.tasks;

    for (let taskNum in allTasks) {

        let task = allTasks[taskNum];

        if(task.id==id){
            task = {
                ...task,
                code: code || '',
                fileName: fileName,
                downloadPath: downloadPath,
                parsons2d: parsons2d
            };

            allTasks[taskNum] = task;
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
        taskTitle.innerHTML = 'Task ' + task.id;

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

            console.log(task);

            document.getElementById('fileName').value = task.fileName;
            document.getElementById('downloadFolder').innerHTML = task.downloadPath;
            document.getElementById('parsons2d').checked = task.parsons2d;
            editor.refresh();
            editor.setValue(task.code);

        }else{
            taskTab.className = 'taskContainer';

        }
    }

    saveToQti();
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
    let textArea = document.getElementById('textArea');
    textArea.innerHTML = editor.getValue();
};


/**
 * Download a single task to QTI format?
 * @param code
 */
let downloadSingle = function() {

    let task = getTaskObject(currentId);
    let fileName = task.fileName;

    if (!fileExists(fileName+'.zip')) {
        run_dnd(task);

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

    // No need to check if file name exists, when all files will be zipped in a folder anyway
    let data = database.tasks;
    run_dnd(data);
};


/**
 *
 */
let chooseDownloadFolder = function(){

    let currentTask = getTaskObject(currentId);

    const {dialog} = require('electron').remote;
    var nameArray;
    let filepath = dialog.showOpenDialog({
        properties: ['openDirectory']
    });
    currentTask.downloadPath = filepath;
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

    let fileName = document.getElementById('fileName').value
        ? document.getElementById('fileName').value
        : 'default';

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
        code: '',
        fileName: '',
        downloadPath: '',
        parsons2d: true
    };

    database.tasks.push(task);

    taskCount++;

    loadTaskList();

};