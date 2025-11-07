// Piano Editor - Global App Configuration

const App_Global = {

    app_name: 'Piano Editor',
    app_version: '0.0.1',

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
            // defaultFileName: 'data',
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
        headerBar: document.getElementById('header_bar'),
        editor: document.getElementById('Editor'),

        // For components that need an initial setup
        setup: () => {
            document.title = App_Global.app_name;
            document.getElementById("app_name").innerHTML = App_Global.app_name;
            initMidiInterface();
        },

        utils: {}
    }
};