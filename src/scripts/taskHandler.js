/**
 * Created by jwjorgen on 27/11/2018.
 */

/**
 * Save/update current task to the database
 */
let saveTask = function () {

    let id = currentId;

    let code = editor.getValue();
    let fileName = getFileName();
    let parsons2d = getParsons2d();
    let title = getTitle();
    let desc_no = getDescription('No');
    let desc_eng = getDescription('Eng');
    let desc_nyno = getDescription('Nyno');
    let num_tasks = getSettingsNumTasks();
    let num_dist = getSettingsNumDistractors();

    let allTasks = database.tasks;

    for (let taskNum in allTasks) {
        let task = allTasks[taskNum];

        if (task.id == id) {
            task = {
                ...task,
                title: /\S/.test(title) ? title : 'Task ' + (task.id + 1), // Checks if title is only whitespace
                code: code || '',
                fileName: fileName,
                parsons2d: parsons2d,
                description: {
                    no: desc_no,
                    eng: desc_eng,
                    nyno: desc_nyno
                },
                numTasks: num_tasks,
                numDistractors: num_dist
            };

            allTasks[taskNum] = task;
        }
    }

    updateTitleInTaskList(id);

    addPreviewDropAndDropAreas(id);

    updatePermutationsSelect(id);


    // Set max num distractors in task preview
    document.getElementById('settingsInputNumDistractors').max = getNumDistractors(id);

    // If the number of distractors has decreased, the maximum number of tasks possible to create also have decreased
    if (document.getElementById('settingsInputNumTasks').value > getMaxNumTasks()) {
        document.getElementById('settingsInputNumTasks').value = null;
    }

    // Update number of maximum number of tasks possible to create
    document.getElementById('maxNumTasksSpan').innerHTML = getMaxNumTasks().toString();

    if (parsons2d) {
        document.getElementById('parsons2DWarning').style.display = "block";
    } else {
        document.getElementById('parsons2DWarning').style.display = "none";
    }
};

let updatePermutations = function () {
    let task = getTaskObject(currentId);
    if (task.permutations) {
        let dag = getPermutations2dArray(task.permutations);
        if (dag) {
            addDagToTask(task);
            updatePermutationsData(currentId);
        }
    }
}


/**
 * Delete task from the database
 *
 * @param {Event} event
 * @param {Number} taskId The ID for the task to be deleted
 * @param {String} taskTitle Title of the task to be deleted
 */
let deleteTask = function (event, taskId, taskTitle) {

    // Have to prevent onClick triggering on div(with onClick) behind
    event.stopPropagation();

    // Open a dialog for delete confirmation
    const response = dialog.showMessageBox(win, {
        type: 'warning',
        buttons: ['Yes', 'No'], //Response
        title: 'Warning',
        message: 'Are you sure you want to delete ' + taskTitle + '?'
    });

    if (response === 1) {
        // Do not delete
        return;
    }

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

    // Update which task to be displayed
    if (currentId === taskId && firstId < 1000000) {
        // Deleting current task and there exists other tasks in the list - load first task
        loadTask(firstId);
    } else if (currentId === taskId && newTaskList.length === 0) {
        // Deleting current task and there is no other tasks in the list
        // Hide paper until the user creates a new task
        let papers = document.getElementsByClassName('paper');
        for (let i = 0; i < papers.length; i++) {
            papers[i].style.display = 'none';
        }
    } else {
        // User deletes a task that is not the current task - reload current task
        loadTask(currentId)
    }
};


/**
 * Add an empty task to the database
 */
let addTask = function () {

    let id = taskCount;

    let task = {
        id: id,
        title: '',
        code: '',
        fileName: '',
        parsons2d: false,
        distractors: [],
        description: {
            no: '',
            eng: '',
            nyno: ''
        },
        permutations: [],
        oldCodeLines: [],
        numTasks: 1,
        numDistractors: 0
    };

    database.tasks.push(task);
    taskCount++;

    // Update the list of tasks in the taskBar
    loadTaskList();

    // Load the newly created task
    loadTask(id);
};


/**
 * Update the task title in the task bar
 *
 * @param {Number} id The ID of current task
 */
let updateTitleInTaskList = function (id) {

    let allTasks = database.tasks;
    let taskList = document.getElementById('taskList');

    for (let taskNum in allTasks) {
        let task = allTasks[taskNum];

        let taskTab = document.getElementById('taskContainer' + task.id.toString());

        if (task.id == id) {
            if (task.title) {
                // Update task title
                taskTab.firstElementChild.innerHTML = task.title;

                // Have to manually update button attribute for the task in the task bar (to get correct title on
                // delete confirmation message)
                let taskDeleteButton = document.createElement('button');
                taskDeleteButton.innerHTML = 'X';
                taskDeleteButton.setAttribute('onclick', 'deleteTask(event, ' + task.id + ', "' + task.title + '")');
                taskDeleteButton.className = 'taskDeleteButton';

                taskTab.replaceChild(taskDeleteButton, taskTab.childNodes[1]);
            }
        }
    }
};