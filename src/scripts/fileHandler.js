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
 * Checks if a file with the same name exists
 * @param fileName
 */
let fileExists = function(fileName) {

    let fs = require('fs');

    let path = './';

    if (fs.existsSync(path + fileName)) {
        alert('ERROR: file name already exists')
    }

    return (fs.existsSync(path + fileName));
};


/**
 * Open a file and display content to code editor
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