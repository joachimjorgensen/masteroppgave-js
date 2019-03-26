/**
 * Created by jwjorgen on 27/11/2018.
 */

//const { dialog } = require('electron').remote;

/**
 * Download a single task to QTI format?
 * @param code
 */
async function downloadSingle() {

    let filepath = await chooseDownloadFolder();

    if(filepath){
        if (fileExists(filepath + '.zip')) {
            const response = dialog.showMessageBox(win, {
                type: 'warning',
                buttons: ['Yes', 'No'], //Response
                title: 'Warning',
                message: 'Filename already exists, do you want to overwrite?'
            });

            if (response === 1) {
                // Do not want to overwrite - open new dialog
                downloadSingle();
            } else {
                let task = getTaskObject(currentId);
                run_dnd(task, filepath);
            }

        } else {
            let task = getTaskObject(currentId);
            run_dnd(task, filepath);
        }
    }

};


/**
 * Download all tasks to QTI format?
 * @param code
 */
async function downloadAll() {

    let filepath = await chooseDownloadFolder();

    if(filepath){
        if (fileExists(filepath + '.zip')) {
            const response = dialog.showMessageBox(win, {
                type: 'warning',
                buttons: ['Yes', 'No'], //Response
                title: 'Warning',
                message: 'Filename already exists, do you want to overwrite?'
            });

            if (response === 1) {
                // Do not want to overwrite - open new dialog
                downloadAll();
            } else {
                let data = database.tasks;
                run_dnd(data, filepath);
            }

        } else {
            let data = database.tasks;
            run_dnd(data, filepath);
        }
    }

};


/**
 *  Open file dialog for choosing a folder
 *  win is defined in ./fileHandler.js
 */
let chooseDownloadFolder = function(){
    return new Promise((resolve, reject) =>{

        dialog.showSaveDialog(win, (filepath) => {
            if (filepath === undefined) {
                resolve(null);
                //reject();
            }
            else {
                resolve(filepath);
            }

        });
    });


    /*
     console.log(currentTask.downloadPath);
     if(!filepath){
     filepath = path.join(__dirname, '../../../../');
     nameArray = filepath.split('/');
     }else{
     nameArray = filepath[0].split('/');
     }

     downloadFolder.innerHTML = ".../"+nameArray[nameArray.length-2]+"/"+nameArray[nameArray.length-1];
     */
};