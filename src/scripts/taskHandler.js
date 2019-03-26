/**
 * Created by jwjorgen on 27/11/2018.
 */

/**
 * Save current task to the database
 * @param id
 */
let saveTask = function() {

    let id = currentId;

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
 * Delete task from list of tasks
 */
let deleteTask = function(event, taskId) {

    event.stopPropagation(); // Have to prevent onClick triggering on div(with onClick) behind

    let newTaskList = [];
    let allTasks = database.tasks;
    let firstId = 1000000;

    for (let taskNum in allTasks) {

        let task = allTasks[taskNum];

        if (task.id != taskId) {

            // Keep track of the first element id in the list
            firstId = task.id < firstId ? task.id : firstId;

            newTaskList.push(task);
        }
    }

    database.tasks = newTaskList;
    loadTaskList();

    if (currentId === taskId && firstId < 1000000) {
        // Deleting current task and there exists other tasks in the list - load first task
        loadTask(firstId);
    } else if(currentId === taskId && newTaskList.length === 0) {
        // Deleting current task and there is no other tasks in the list
        // Hide paper until the user creates a new task
        let papers = document.getElementsByClassName('paper');
        for (let i = 0; i < papers.length; i++) {
            papers[i].style.display = 'none';
        }
    } else {
        // Load current task
        loadTask(currentId)
    }
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

    // Update the list of tasks in the taskBar
    loadTaskList();

    // Load task this task
    loadTask(id);

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