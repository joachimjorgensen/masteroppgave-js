/**
 * Created by jwjorgen on 27/11/2018.
 */

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

    return document.getElementById('parsons2d').checked;
};


/**
 * Return the description for a given language
 *
 * @param lang (must be one of 'No', 'Eng', or 'Nyno')
 */
let getDescription = function (lang) {

    let nicE = new nicEditors.findEditor('richEditor' + lang);

    return nicE.getContent();
};