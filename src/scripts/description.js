/**
 * Created by jwjorgen on 26/03/2019.
 */

/**
 * Shows the description tab for a given language
 *
 * @param {Event} evt
 * @param {String} language The language to open a tab for
 */
function openTab(evt, language) {
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(language).style.display = "block";
    evt.currentTarget.className += " active";
}