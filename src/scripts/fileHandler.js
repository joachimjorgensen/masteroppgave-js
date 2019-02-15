/**
 * Created by jwjorgen on 29/10/2018.
 */


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