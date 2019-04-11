/**
 * Created by jwjorgen on 02/04/2019.
 */

/**
 * Loads the rich text editor nicEdit for task description (in three languages, thus three tabs)
 */
let loadNicEdit = function() {

    // Have to keep track of old description values to detect changes from the rich text editor
    // (The nicEditor API doesn't support onChange properly)
    let prevValues = {
        no: '',
        eng: '',
        nyno: '',
    };

    let config = {
        fullPanel: false,
        buttonList: [
            'bold',
            'italic',
            'underline',
            'subscript',
            'superscript',
            'indent',
            'outdent',
            'ol',
            'ul',
            'left',
            'center',
            'right',
            'fontSize'
        ]
    };

    // The 'blur' event triggers whenever for some reason (due to api incompleteness), for this reason
    // one has to compare old input value with new input value
    let niceditorNo = new nicEditor(config);
    niceditorNo.panelInstance('richEditorNo');
    niceditorNo.addEvent('blur', () => {
        let nicE = new nicEditors.findEditor('richEditorNo');
        let val =  nicE.getContent();

        if (val !== prevValues.no) {
            prevValues.no =  val;
            saveTask();
        }
    });

    let niceditorEng = new nicEditor(config);
    niceditorEng.panelInstance('richEditorEng');
    niceditorEng.addEvent('blur', () => {
        let nicE = new nicEditors.findEditor('richEditorEng');
        let val =  nicE.getContent();

        if (val !== prevValues.eng) {
            prevValues.eng =  val;
            saveTask();
        }
    });

    let niceditorNyno = new nicEditor(config);
    niceditorNyno.panelInstance('richEditorNyno');
    niceditorNyno.addEvent('blur', () => {
        let nicE = new nicEditors.findEditor('richEditorNyno');
        let val =  nicE.getContent();

        if (val !== prevValues.nyno) {
            prevValues.nyno =  val;
            saveTask();
        }
    });
};

