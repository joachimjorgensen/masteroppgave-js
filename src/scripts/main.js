/**
 * Created by jwjorgen on 29/10/2018.
 */
const path = require('path');
const url = require('url');
let filepath = "";

let loadMain = function(){
    const downloadFolder = document.getElementById('downloadFolder');
    filepath = path.join(__dirname, '../../../../');
    var nameArray = filepath.split('/');
    downloadFolder.innerHTML = ".../" + nameArray[nameArray.length - 2] + "/" + nameArray[nameArray.length - 1];

}

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

    if (!fileExists(fileName+'.zip')) {
        let data = {payload: code, fileName: fileName, parsons2d: parsons2d};
        run_dnd(data,filepath)

        let jsonString = JSON.stringify(data);
        let requestDiv = document.getElementById('serverResponse');
        requestDiv.innerHTML = jsonString;
    }
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

    if (!fileExists(fileName+'.zip')) {
        let data = {payload: code, fileName: fileName, parsons2d: parsons2d};
        run_dnd(data)

        let jsonString = JSON.stringify(data);
        let requestDiv = document.getElementById('serverResponse');
        requestDiv.innerHTML = jsonString;
    }
};

let chooseDownloadFolder = function(){
    const {dialog} = require('electron').remote;
    var nameArray;
    filepath = dialog.showOpenDialog({
        properties: ['openDirectory']
    });
    if(!filepath){
        filepath = path.join(__dirname, '../../../../');
        nameArray = filepath.split('/');
    }else{
        nameArray = filepath[0].split('/');
    }
    downloadFolder.innerHTML = ".../"+nameArray[nameArray.length-2]+"/"+nameArray[nameArray.length-1];

}

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