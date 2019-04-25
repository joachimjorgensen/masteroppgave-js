/**
 * Created by jwjorgen on 02/04/2019.
 */

// Keep a reference to the selected dropdown menu, because the select element is destroyed
// and rebuild upon task update
let selectedDropDownOptionId = 0;
let currentPreviewPermutation = 0;
let allPermutations;
let falsePositives;

/**
 * Update the permutation section
 *
 * @param {Number} id The ID of the current task
 */
let updatePermutationsSelect = function (id) {

    updatePermutationsArray(id);

    let permutationsContainerElement = document.getElementById('permutationsContainer');

    let codeLines = getCodeLines(id);

    // Remove preview elements (to get a clean slate)
    while (permutationsContainerElement.firstChild) {
        permutationsContainerElement.removeChild(permutationsContainerElement.firstChild);
    }

    let selectElement = document.createElement('select');
    selectElement.id = 'permutations-select';
    selectElement.setAttribute('onchange', 'updatePermutationCheckboxes(' + id + ')');

    let pElement = document.createElement('p');
    pElement.innerHTML = 'Must come before:';
    pElement.id = 'comeBeforeText';

    let checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'permutationsCheckboxContainer';
    checkboxContainer.id = 'permutationsCheckboxContainer';

    permutationsContainerElement.appendChild(selectElement);
    permutationsContainerElement.appendChild(pElement);
    permutationsContainerElement.appendChild(checkboxContainer);

    let permutationsSelectElement = document.getElementById('permutations-select');

    // Remove preview elements (to get a clean slate)
    while (permutationsSelectElement.firstChild) {
        permutationsSelectElement.removeChild(permutationsSelectElement.firstChild);
    }

    // Add select options
    for (let index = 0; index < codeLines.length; index++) {

        let codeLine = codeLines[index];

        // Add options to drop down menu
        let optionElement = document.createElement('option');

        optionElement.value = index;
        if (index === selectedDropDownOptionId) { optionElement.selected = true }
        optionElement.innerHTML = 'Line ' + (index + 1) + ': ' + codeLine;

        permutationsSelectElement.appendChild(optionElement);
    }

    updatePermutationCheckboxes(id);
};


/**
 * Updates checkboxes to correspond to permutation values. First destroy select container elements,
 * and recreate them based on updated permutation values
 *
 * @param {Number} id The ID of the current task
 */
let updatePermutationCheckboxes = function (id) {

    let permutationsCheckboxContainer = document.getElementById('permutationsCheckboxContainer');
    let selectElement = document.getElementById('permutations-select');

    // Update reference to currently open select option
    selectedDropDownOptionId = selectElement.selectedIndex;

    let codeLines = getCodeLines(id);

    // Remove preview elements (to get a clean slate)
    while (permutationsCheckboxContainer.firstChild) {
        permutationsCheckboxContainer.removeChild(permutationsCheckboxContainer.firstChild);
    }

    for (let index = 0; index < codeLines.length; index++) {
        let checkbox = document.createElement('input');
        let label = document.createElement('label');
        let codeLine = codeLines[index];

        checkbox.id = 'permutationCheckbox' + index;
        checkbox.className = 'checkbox';
        checkbox.type = 'checkbox';
        checkbox.onclick = () => checkboxOnChange(id, checkbox.id, index);

        label.className = '';

        checkbox.checked = checkboxChecked(id, index);

        if (selectElement.selectedIndex === index) {
            checkbox.checked = true;
            checkbox.disabled = true;
            label.className = 'checkedLabel';
        }

        label.for = 'permutationCheckbox' + index;
        label.innerHTML = 'Line ' + (index + 1) + ': ' + codeLine;

        // Group together the checkbox and label
        let checkboxGrouping = document.createElement('div');
        checkboxGrouping.appendChild(checkbox);
        checkboxGrouping.appendChild(label);

        permutationsCheckboxContainer.appendChild(checkboxGrouping);
    }
};


/**
 * Returns true or false whether a checkbox should be checked or not, based on permutation values
 *
 * @param {Number} taskId The ID of the current task
 * @param {String} checkboxId The ID of the checkbox being audited
 * @returns {boolean} whether the checkbox should be checked or not
 */
let checkboxChecked = function (taskId, checkboxId) {

    let permutationsSelectElement = document.getElementById('permutations-select');
    let row = permutationsSelectElement.selectedIndex;

    let allTasks = database.tasks;

    for (let taskNum in allTasks) {

        let task = allTasks[taskNum];

        if (task.id == taskId) {

            return task.permutations[row].indexOf(checkboxId) !== -1;

        }
    }
};


/**
 * Update values in the permutation list in task object
 *
 * @param {Number} taskId The ID of the current task
 * @param {String} checkboxId The ID of the changed checkbox element
 * @param {Number} checkBoxLineNumber The line number of the checkbox (effectively the index of the checkbox)
 */
let checkboxOnChange = function (taskId, checkboxId, checkBoxLineNumber) {
    let checkbox = document.getElementById(checkboxId);

    console.log(checkboxId, checkBoxLineNumber);

    let permutationsSelectElement = document.getElementById('permutations-select');
    let row = permutationsSelectElement.selectedIndex;

    // Update permutations list in the task object
    let allTasks = database.tasks;

    for (let taskNum in allTasks) {

        let task = allTasks[taskNum];

        if (task.id == taskId) {

            if (checkbox.checked) {
                task.permutations[row].push(checkBoxLineNumber);
                task.permutations[row].sort();
            } else {
                let index = task.permutations[row].indexOf(checkBoxLineNumber);
                task.permutations[row].splice(index, 1);
            }

        }
    }

    saveTask();
};


/**
 * Updates the array of permutations if a code line is added or deleted
 * Needed because the permutations array consists of lists for each line number, where the
 * contents of each line is a pointer to a dependency to another line. And thus, if a line is deleted
 * or added, all reference points had to be updated accordingly
 *
 * @param {Number} id Id of the current task
 */
let updatePermutationsArray = function (id) {

    let numCodeLines = getNumCodeLines(id);

    // Update permutations list in the task object
    let allTasks = database.tasks;

    for (let taskNum in allTasks) {
        let task = allTasks[taskNum];

        if (task.id == id) {
            // Get a reference to old code line values and new ones, for comparing purposes
            let oldCodeLines = task.oldCodeLines;
            let newCodeLines = getCodeLines(id);

            while (!(task.permutations.length === numCodeLines)) {
                // If the number of code lines have changed, create a permutation list from scratch
                let newPermutationsList = [...task.permutations];

                if (task.permutations.length > numCodeLines) {
                    // If a line was deleted
                    for (let index = 0; index < task.permutations.length; index++) {
                        if (oldCodeLines[index] !== newCodeLines[index]) {
                            // Line number 'index' was deleted from permutation list
                            newPermutationsList.splice(index, 1);

                            // Have to update index of elements in all arrays of permutations list, (only update
                            // elements with an index higher than the deleted index
                            for (let i = 0; i < newPermutationsList.length; i++) {
                                // Remove all permutation dependencies regarding the deleted line
                                newPermutationsList[i] = newPermutationsList[i].filter(el => el !== index);
                                // Update all permutation dependencies with index after the deleted line
                                newPermutationsList[i] = newPermutationsList[i].map(el => el > index ? (el - 1) : el);
                            }

                            break;
                        }
                    }

                } else {
                    // Else, a line was added
                    for (let index = 0; index < numCodeLines; index++) {
                        if (oldCodeLines[index] !== newCodeLines[index]) {
                            // Line number 'index' was added from permutation list (add an empty list in that position)
                            newPermutationsList.splice(index, 0, []);

                            // Have to update index of elements in all arrays of permutations list, (only update
                            // elements with an index higher than the deleted index
                            for (let i = 0; i < newPermutationsList.length; i++) {
                                // Update all permutation dependencies with index after the added line
                                newPermutationsList[i] = newPermutationsList[i].map(el => el >= index ? (el + 1) : el);
                            }

                            break;
                        }
                    }
                }

                // Update permutations
                task.permutations = newPermutationsList;
            }

            task.oldCodeLines = [...getCodeLines(id)];
        }
    }
};


/**
 * Transform the permutation list into a 2D matrix for representing a DAG
 *
 * @param {Array} permutations Two dimensional array containing permutation dependencies between code lines
 * @returns {Array} Two dimensional array (n*n) for representing a DAG
 */
let getPermutations2dArray = function (permutations) {

    let numCodeLines = permutations.length;

    if (permutations) {
        let array2D = [];

        for (let rowIndex = 0; rowIndex < numCodeLines; rowIndex++) {
            let row = [];

            for (let columnIndex = 0; columnIndex < numCodeLines; columnIndex++) {
                if (rowIndex === columnIndex) {
                    row.push(1);

                } else if (permutations[rowIndex].indexOf(columnIndex) !== -1) {
                    row.push(1);

                } else {
                    row.push(0);
                }
            }

            array2D.push(row);
        }

        return array2D;

    } else {

        return [];
    }
};

/**
 * Creates (and updates) the element that displays the previews of the permutations.
 *
 * @param {Number} id Id of the current task
 */
let updatePermutationsData = function (id) {
    let dag = getTaskObject(id).dagMatrix;
    console.log(dag)
    if (dag) {
        let calculatePermutations = new CalculatePermutations(dag);

        allPermutations = calculatePermutations.getAllTopologicalSorts();
        falsePositives = calculatePermutations.getAllFalsePositives();

        if (!Array.isArray(allPermutations) || !Array.isArray(calculatePermutations.getAllTransitiveClosures())) {
            document.getElementById('permutationsWarning').style.display = "block";
            setPermutationsToZero(id);
            return;
        } else {
            document.getElementById('permutationsWarning').style.display = "none";
        }

        document.getElementById('numPermCount').innerHTML = allPermutations.length;
        document.getElementById('numFalsePosCount').innerHTML = falsePositives.length;
        document.getElementById('randomlyCorrectChance').innerHTML = parseFloat(calculatePermutations.getErrorRates()*100).toFixed(2);

        allPermutations = allPermutations.concat(falsePositives);

        currentPreviewPermutation = 0;

        updatePermutationsPreview(id);
    } else {
        setPermutationsToZero(id);
    }
}

/**
 * Simply resets all permutation information 
 * 
 * @param {Number} id Id of the current task
 */
let setPermutationsToZero = function (id) {
    allPermutations = [];
    falsePositives = [];

    document.getElementById('numPermCount').innerHTML = 0;
    document.getElementById('numFalsePosCount').innerHTML = 0;
    document.getElementById('randomlyCorrectChance').innerHTML = 0;

    currentPreviewPermutation = 0;

    updatePermutationsPreview(id);
}


/**
 * Creates (and updates) the element that displays the previews of the permutations.
 *
 * @param {Number} id Id of the current task
 */
let updatePermutationsPreview = function (id) {
    let permutationsPreviewElement = document.getElementById('possiblePermutationsContainer');

    // Remove preview elements (to get a clean slate)
    while (permutationsPreviewElement.firstChild) {
        permutationsPreviewElement.removeChild(permutationsPreviewElement.firstChild);
    }

    // Create the navigation bar of the preview element
    let divElement = document.createElement('div');
    divElement.className = 'spaceBetweenContainer';
    let buttonPrev = document.createElement('button');
    buttonPrev.onclick = function () { goToPrevPermutation(event, allPermutations.length) };
    buttonPrev.innerHTML = 'Prev';
    buttonPrev.className = 'permPreviewButton';
    let buttonNext = document.createElement('button');
    buttonNext.onclick = function () { goToNextPermutation(event, allPermutations.length) };
    buttonNext.innerHTML = 'Next';
    buttonNext.className = 'permPreviewButton';
    let taskTracker = document.createElement('p');
    taskTracker.innerHTML = (allPermutations.length === 0 ? 0 : currentPreviewPermutation + 1) + '/' + allPermutations.length;
    divElement.appendChild(buttonPrev);
    divElement.appendChild(taskTracker);
    divElement.appendChild(buttonNext);
    permutationsPreviewElement.appendChild(divElement);

    if (allPermutations.length > 0) {
        // Add code lines to the preview
        let permPreviewElement = document.createElement('div');
        let codeLines = getCodeLines(id);
        for (let index = 0; index < getNumCodeLines(id); index++) {
            let pElement = document.createElement('p');
            let lineNumber = allPermutations[currentPreviewPermutation][index];
            pElement.innerHTML = codeLines[lineNumber];
            permPreviewElement.appendChild(pElement);
        }

        permutationsPreviewElement.appendChild(permPreviewElement);
    }
};


/**
 * Update the counter for the current preview
 *
 * @param {Event} e
 * @param {Number} numPermutations Number of permutations for the code lines
 */
let goToPrevPermutation = function (e, numPermutations) {
    e.preventDefault();
    if (currentPreviewPermutation === 0) {
        currentPreviewPermutation = numPermutations - 1;
    } else {
        currentPreviewPermutation -= 1;
    }
    updatePermutationsPreview(currentId);
};


/**
 * Update the counter for the current preview
 *
 * @param e
 * @param {Number} numPermutations Number of permutations for the code lines
 */
let goToNextPermutation = function (e, numPermutations) {
    e.preventDefault();
    if (currentPreviewPermutation === numPermutations - 1) {
        currentPreviewPermutation = 0;
    } else {
        currentPreviewPermutation += 1;
    }
    updatePermutationsPreview(currentId);
};