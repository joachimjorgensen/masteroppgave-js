/**
 * Created by jwjorgen on 28/03/2019.
 */

let addPreviewDropAndDropAreas = function(id) {
    addPreviewDropAreas(id);
    addPreviewDragAreas(id);
};


/**
 * Creates a grid of drop areas in the preview
 * The grid is calculated based on the number of code lines and
 * the number of indents in the code
 *
 * @param id
 */
let addPreviewDropAreas = function(id) {

    let parsons2D = getParsons2d();

    let numRows = getNumCodeLines(id);
    let numColumns = getNumColumnsCode(id);

    let previewDropAreaElement = document.getElementById('previewDropArea');

    // Remove preview elements (to get a clean slate)
    while (previewDropAreaElement.firstChild) {
        previewDropAreaElement.removeChild(previewDropAreaElement.firstChild);
    }

    // Create the grid of drop areas
    for (let row = 0; row < numRows; row++) {

        let rowElement = document.createElement('div');
        rowElement.className = 'previewDropAreaRow';

        if (parsons2D) {
            for (let column = 0; column < numColumns; column++) {

                let dropArea = createDropArea('dropArea' + row + column);
                rowElement.appendChild(dropArea);
            }
        } else {
            let rectangle = document.createElement('div');
            rectangle.className = 'dropAreaFull';
            rectangle.id = 'dropArea' + id;

            rowElement.appendChild(rectangle);
        }

        previewDropAreaElement.appendChild(rowElement);
    }
};


/**
 * Creates the drag areas for the preview
 * All code lines are added as drop areas, and distractors are
 * added with a mask
 *
 * @param id
 */
let addPreviewDragAreas = function(id) {

    let codeLines = getCodeLines(id);
    let dragAreaLines = [...codeLines];

    // Mask distractors and add them to drag area
    for (let x = 0; x < getNumDistractors(id); x++) {
        dragAreaLines.push('Random Distractor');
    }

    // Randomize the order of the drag areas
    dragAreaLines = shuffleArray(dragAreaLines);

    let previewDragAreaElement = document.getElementById('previewDragArea');

    // Remove preview elements (to get a clean slate)
    while (previewDragAreaElement.firstChild) {
        previewDragAreaElement.removeChild(previewDragAreaElement.firstChild);
    }

    // Create the grid of drag areas
    let index = 0;
    while (dragAreaLines[index]) {

        let dragAreaText = dragAreaLines[index];
        let dragArea = createDragArea('dragArea' + index);
        dragArea.innerHTML = dragAreaText;

        previewDragAreaElement.appendChild(dragArea);

        index++;
    }
};


/**
 * Creates a drop area element
 *
 * @param id
 * @returns {Element|Electron.WebviewTag}
 */
let createDropArea = function(id) {
    let rectangle = document.createElement('div');
    rectangle.className = 'dropArea';
    rectangle.id = id;

    return rectangle;
};


/**
 * Creates a drag area element
 *
 * @param id
 * @returns {Element|Electron.WebviewTag}
 */
let createDragArea = function(id) {
    let rectangle = document.createElement('div');
    rectangle.className = 'dragArea';
    rectangle.id = id;

    return rectangle;
};


/**
 * Shuffles a given array
 *
 * @param array
 * @returns {*}
 */
let shuffleArray = function(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};