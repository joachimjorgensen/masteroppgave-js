/**
 * Created by jwjorgen on 29/10/2018.
 */

const { dialog } = require('electron').remote;
let win = require('electron').remote.getCurrentWindow();
let fs = require('fs');

/**
 * ---------- DEPRECATED --------------
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
        saveTask();
    };

    reader.readAsText(input.files[0]);
};


/**
 * Checks if a file with a given name already exists
 *
 * @param {String} filepath The path to be checked
 * @returns {boolean} Boolean whether file exists or not
 */
let fileExists = function(filepath) {

    try {
        if (fs.existsSync(filepath)) {
            // file exists
            return true;
        }
    } catch(err) {
        // file does not exist
        return false;
    }
};


/**
 * Open a file dialog and display selected file content to code editor
 */
let openFileDialog = function() {

    // BTW: win = mainWindow in src/main.js
    dialog.showOpenDialog(
        win,
        {properties: ['openFile']},
        (filePaths) => {
            //Callback (filePaths is an array of file paths)
            if (filePaths) {
                fs.readFile(filePaths[0], 'utf-8', function (err, data) {
                    if (err) {
                        console.error(err);
                        return
                    }

                    // Have to set the editor value to an empty string first, so
                    // that the value is updated when uploading the same file twice.
                    editor.setOption('value', '');
                    editor.setOption('value', data);
                    saveTask();
                });
            }
        }
    );
};