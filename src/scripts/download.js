/**
 * Created by jwjorgen on 27/11/2018.
 */

/**
 * Download a single task to QTI format?
 * @param code
 */
async function downloadSingle() {

    let filepath = await chooseDownloadFolder();
    if(filepath){
        let task = getTaskObject(currentId);
        run_dnd(task, filepath);
    }

};


/**
 * Download all tasks to QTI format?
 * @param code
 */
async function downloadAll() {

    let filepath = await chooseDownloadFolder();
    if(filepath){
        let data = database.tasks;
        run_dnd(data, filepath);
    }

};


/**
 *
 */
let chooseDownloadFolder = function(){
    return new Promise((resolve, reject) =>{
        const { dialog } = require('electron').remote;
        //var nameArray;
        /*let filepath = dialog.showOpenDialog({
         properties: ['openDirectory']
         });*/

        dialog.showSaveDialog((filepath) => {
            if (filepath === undefined) {
                console.log("You didn't save the file");
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