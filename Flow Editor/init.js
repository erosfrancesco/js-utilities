// node-based graph editor
// It is your primary tool for creating and editing visual scripting node networks, 
// commonly referred to merely as Blueprints.

const App_Global = {

    start: () => {
        // Configure File IO
        const { 
            fileUpload,
            fileExport,
            fileNaming
        } = App_Global.UI;

        _Configure_Json_IO({
            fileExport,
            fileUpload,
            fileNaming,
            defaultFileName: 'Blueprints',
            parseInputData: (data) => {
                return data
            },
            parseOutputData: (data) => {
                return data
            }
        });

        // Configure UI
        App_Global.UI.setup();
    },

    UI: {

        fileUpload: document.getElementById('file_upload'),
        fileExport: document.getElementById('file_export'),
        fileNaming: document.getElementById('file_naming'),
        editor:     document.getElementById('Editor'),
        
        setup: () => {
            setupLinesWrapper();
        },

        utils: {}
    }
};