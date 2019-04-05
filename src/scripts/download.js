/**
 * Created by jwjorgen on 27/11/2018.
 */

/**
 * Download a single task to QTI format
 */
async function downloadSingle() {

    let filepath = await chooseDownloadFolder();

    if(filepath){
        if (fileExists(filepath + '.zip')) {
            // Filename already exists, ask user if they want to overwrite
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

                // Create a DAG matrix for the task
                addDagToTask(task);

                // Download the task
                run_dnd(task, filepath);
            }

        } else {
            // Filename does not already exist - download
            let task = getTaskObject(currentId);

            // Create a DAG matrix for the task
            addDagToTask(task);

            // Download the task
            run_dnd(task, filepath);
        }
    }

};


/**
 * Download all tasks in the database to QTI format
 */
async function downloadAll() {

    let filepath = await chooseDownloadFolder();

    if(filepath){
        if (fileExists(filepath + '.zip')) {
            // Filename already exists, ask user if they want to overwrite
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
                // Do want to overwrite
                let data = database.tasks;

                // Create a DAG matrix for each task
                for (let index = 0; index < data.length; index++) {
                    addDagToTask(data[index]);
                }

                // Download all tasks
                run_dnd(data, filepath);
            }

        } else {
            // Filename does not already exist - download
            let data = database.tasks;

            // Create a DAG matrix for each task
            for (let index = 0; index < data.length; index++) {
                addDagToTask(data[index]);
            }

            // Download all tasks
            run_dnd(data, filepath);
        }
    }

};


/**
 *@param {Object} task Task object where a DAG matrix (based on its permutations) should be added
 */
let addDagToTask = function(task) {
    task['dagMatrix'] = getPermutations2dArray(task.permutations);
};


/**
 *  Open file dialog for choosing a folder.
 *  'win' is defined in ./fileHandler.js
 */
let chooseDownloadFolder = function(){
    return new Promise((resolve, reject) =>{

        // Open Electron dialog
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
};