/**
 * Created by jwjorgen on 29/10/2018.
 */

/**
 * Save the code to QTI format?
 * @param code
 */
let save = function(code) {

    let textArea = document.getElementById('textArea');
    textArea.innerHTML = code;

    // Convert param to a json object
    let fileName = getFileName();
    let parsons2d = getParsons2d();

    let dict = {payload: code, fileName: fileName, parsons2d: parsons2d};
    let json = JSON.stringify(dict);

    let requestDiv = document.getElementById('serverResponse');
    requestDiv.innerHTML = json;
};


/**
 * Download QTI format?
 * @param code
 */
let download = function(code) {

    let textArea = document.getElementById('textArea');
    textArea.innerHTML = code;

    // Convert param to a json object
    let fileName = getFileName();
    let parsons2d = getParsons2d();

    let dict = {payload: code, fileName: fileName, parsons2d: parsons2d};
    let json = JSON.stringify(dict);


    let requestDiv = document.getElementById('serverResponse');
    requestDiv.innerHTML = json;
};


/**
 * Open a file and display content to code editor and
 * send the file content to another function (Good wording, I am good)
 *
 * @param event
 */
let openFile = function(event) {

    let code = '';
    let input = event.target;

    let reader = new FileReader();

    reader.onload = function() {
        code = reader.result;
        editor.setOption('value', code);


        /* --------------------------
        let requestDiv = document.getElementById('serverResponse');
        requestDiv.innerHTML = code;

        let textArea = document.getElementById('textArea');
        textArea.innerHTML = code;

        // Convert param to a json object
        let fileName = getFileName();
        let parsons2d = getParsons2d();

        let dict = {payload: code, fileName: fileName, parsons2d: parsons2d};
        let json = JSON.stringify(dict);
        // -------------------------- */

    };

    reader.readAsText(input.files[0]);
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
 * Checks if the parsons2d box is checked
 *
 * @returns {boolean|Array|string|ga.selectors.pseudos.checked|*}
 */
let getParsons2d = function () {

    let parsons2d = document.getElementById('parsons2d').checked;

    return parsons2d;
};