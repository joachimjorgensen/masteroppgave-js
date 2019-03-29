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

    return 'Error: no tasks exist';
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


/**
 * Returns the number of lines in the code editor
 *
 * @returns {int}
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

    //return editor.lineCount();
};


/**
 * Returns the number of distractors of a task
 *
 * @param id
 * @returns {int}
 */
let getNumDistractors = function(id) {

    let task = getTaskObject(id);

    return task.distractors ? task.distractors.length : 0;
};


/**
 *
 * Returns an array of code lines
 * @param id
 * @returns {*}
 */
let getCodeLines = function(id) {

    let task = getTaskObject(id);
    let lines = task.code;

    if (lines) {
        lines = lines.split('\n');
        lines = lines.filter(Boolean); // Removes empty string from array
        return lines;

    } else {
        return [];
    }
};

/**
 * Returns the number of indents in the code
 *
 * @param id
 * @returns {int}
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
 * @param id
 * @returns {Array}
 */
let getDistractorLines = function(id) {
    let task = getTaskObject(id);
    return task.distractors;
};