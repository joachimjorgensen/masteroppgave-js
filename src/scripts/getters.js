/**
 * Created by jwjorgen on 27/11/2018.
 */

/**
 * Returns a task given an id
 *
 * @param {Number} id The ID of the task to be returned
 * @returns {Object} A task object
 */
let getTaskObject = function(id) {

    let allTasks = database.tasks;

    for (let taskNum in allTasks) {
        let task = allTasks[taskNum];
        if (task.id == id) {
            return task;
        }
    }

    return 'Error: no tasks exist';
};


/**
 * Returns the value of the filename input element. If none selected, 'default' is returned
 *
 * @returns {string} The filename String
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
 * Return the value of the title input element. If none selected, 'default' is returned
 *
 * @returns {string} The title String
 */
let getTitle = function() {

    return document.getElementById('taskTitleInput').value;
};



/**
 * Returns the value of the parsons2d checkbox element
 *
 * @returns {boolean} The boolean value of the parsons2d checkbox
 */
let getParsons2d = function () {

    return document.getElementById('parsons2d').checked;
};


/**
 * Returns the description for a given language
 *
 * @param {String} lang The language of the description (must be one of 'No', 'Eng', or 'Nyno')
 * @returns {*|xhtml}
 */
let getDescription = function (lang) {

    let nicE = new nicEditors.findEditor('richEditor' + lang);

    return nicE.getContent();
};


/**
 * Returns the number of lines in the source code editor
 *
 * @param {Number} id The ID of desired task
 * @returns {int} The number of lines of code in the source code editor
 */
let getNumCodeLines = function(id) {

    let task = getTaskObject(id);
    let lines = task.code;

    if (lines) {
        lines = lines.split('\n');
        lines = lines.filter(Boolean); // Removes empty string from array
        return lines.length;
    } else {
        return 0;
    }
};


/**
 * Returns the number of distractors of a task
 *
 * @param {Number} id The ID of desired task
 * @returns {int} The number of distractors for the task
 */
let getNumDistractors = function(id) {

    let task = getTaskObject(id);

    return task.distractors ? task.distractors.length : 0;
};


/**
 * Returns an array of code lines´from the source code editor
 *
 * @param {Number} id The ID of desired task
 * @returns {Array|*} Array of code lines from the source code editor
 */
let getCodeLines = function(id) {

    let task = getTaskObject(id);
    let lines = task.code;

    if (lines) {
        lines = lines.split('\n');
        lines = lines.filter(Boolean); // Removes empty strings from array
        return lines;
    } else {
        return [];
    }
};

/**
 * Returns the maximum number of indents/tabs in the source code editor
 *
 * @param {Number} id The ID of desired task
 * @returns {int} The maximum number of tabs from the source code editor
 */
let getNumColumnsCode = function(id) {

    let codeLines = getCodeLines(id);

    if (codeLines) {
        let tabSize = findTabSize(codeLines);
        return getMaxTabs(codeLines, tabSize) + 1;
    } else {
        return 1;
    }
};


/**
 * Returns the list of distractors for a given task
 *
 * @param {Number} id The ID of desired task
 * @returns {Array} Array of distractors
 */
let getDistractorLines = function(id) {
    let task = getTaskObject(id);
    return task.distractors;
};


/**
 * Returns the value of the settings field 'number of tasks to create'
 *
 * @returns {Number} The number of tasks to create
 */
let getSettingsNumTasks = function () {

    return document.getElementById('settingsInputNumTasks').value ? document.getElementById('settingsInputNumTasks').value : 1;
};


/**
 * Returns the value of the settings field 'number of distractors to create'
 *
 * @returns {Number} The number of distractors to create
 */
let getSettingsNumDistractors = function () {

    return document.getElementById('settingsInputNumDistractors').value ? document.getElementById('settingsInputNumDistractors').value : 0;
};


/**
 * Get the maximum number of unique tasks to create based on the number of subsets possible to create from the pool of
 * distractors
 *
 * @returns {number}
 */
let getMaxNumTasks = function() {
    let numDistractors = getNumDistractors(currentId);
    let numDistractorsToChoose = getSettingsNumDistractors();

    return combinations(numDistractors, numDistractorsToChoose);
};