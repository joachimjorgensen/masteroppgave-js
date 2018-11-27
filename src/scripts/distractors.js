/**
 * Created by jwjorgen on 27/11/2018.
 */


/**
 * Load the current task distractors
 */
let loadDistractors = function() {

    let distractorListContainer = document.getElementById('distractorListContainer');

    // Remove List elements
    while (distractorListContainer.firstChild) {
        distractorListContainer.removeChild(distractorListContainer.firstChild);
    }

    let id = currentId;
    let allTasks = database.tasks;

    for (let taskNum in allTasks) {

        let task = allTasks[taskNum];

        if (task.id == id) {

            let allDistractors = task.distractors;

            for(let distractorNum in allDistractors) {

                let distractor = allDistractors[distractorNum];

                let distractorTextContainer = document.createElement('div');
                distractorTextContainer.className = 'distractorTextContainer';

                let distractorText = document.createElement('p');
                distractorText.innerHTML = distractor;

                distractorTextContainer.appendChild(distractorText);

                distractorListContainer.appendChild(distractorTextContainer);
            }

        }
    }
};


/**
 * Add a distractor to current task
 */
let addDistractor = function() {

    // Stop the page from refreshing on submit
    event.preventDefault();

    let id = currentId;

    let distractor = document.forms["distractorForm"]["distractorInput"].value;

    let allTasks = database.tasks;

    for (let taskNum in allTasks) {

        let task = allTasks[taskNum];

        if (task.id == id) {

            task.distractors.push(distractor);

        }
    }

    // Empty the input field on submit
    document.forms["distractorForm"]["distractorInput"].value = '';

    loadDistractors();
};