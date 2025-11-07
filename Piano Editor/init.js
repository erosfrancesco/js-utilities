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
            defaultFileName: 'PianoEditor_Data',
            // Load/Save data parsing functions
            parseInputData: (data) => {
                App_Global.UI.pianoRoll.loadFromJSON(data);
                return data;
            },
            parseOutputData: () => {
                return App_Global.notes;
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
            initPianoRollInterface();

            // App_Global.UI.pianoRoll.loadFromJSON(initialDataForTesting);
        },

        utils: {}
    },

    currentNotes: new CurrentNotesPlaying(),
    notes: [],
};
/*
const initialDataForTesting = [
    {
        "note": 80,
        "upVelocity": 64,
        "downVelocity": 24,
        "upTimeStamp": 4225.60000000149,
        "downTimeStamp": 3764.60000000149
    },
    {
        "note": 83,
        "upVelocity": 64,
        "downVelocity": 46,
        "upTimeStamp": 4252.60000000149,
        "downTimeStamp": 3773.60000000149
    },
    {
        "note": 81,
        "upVelocity": 64,
        "downVelocity": 35,
        "upTimeStamp": 4533.60000000149,
        "downTimeStamp": 4368.60000000149
    },
    {
        "note": 80,
        "upVelocity": 64,
        "downVelocity": 37,
        "upTimeStamp": 5115.60000000149,
        "downTimeStamp": 4932.60000000149
    },
    {
        "note": 80,
        "upVelocity": 64,
        "downVelocity": 20,
        "upTimeStamp": 5599.60000000149,
        "downTimeStamp": 5167.60000000149
    },
    {
        "note": 78,
        "upVelocity": 64,
        "downVelocity": 24,
        "upTimeStamp": 6384.60000000149,
        "downTimeStamp": 5539.60000000149
    },
    {
        "note": 74,
        "upVelocity": 64,
        "downVelocity": 50,
        "upTimeStamp": 8119.60000000149,
        "downTimeStamp": 7041.60000000149
    },
    {
        "note": 78,
        "upVelocity": 64,
        "downVelocity": 44,
        "upTimeStamp": 8282.70000000298,
        "downTimeStamp": 7027.60000000149
    },
    {
        "note": 79,
        "upVelocity": 64,
        "downVelocity": 9,
        "upTimeStamp": 8762.60000000149,
        "downTimeStamp": 8230.60000000149
    },
    {
        "note": 79,
        "upVelocity": 64,
        "downVelocity": 34,
        "upTimeStamp": 9430.60000000149,
        "downTimeStamp": 8894.60000000149
    },
    {
        "note": 77,
        "upVelocity": 64,
        "downVelocity": 36,
        "upTimeStamp": 9663.60000000149,
        "downTimeStamp": 9238.60000000149
    },
    {
        "note": 76,
        "upVelocity": 64,
        "downVelocity": 7,
        "upTimeStamp": 10428.70000000298,
        "downTimeStamp": 9690.60000000149
    },
    {
        "note": 80,
        "upVelocity": 64,
        "downVelocity": 43,
        "upTimeStamp": 11766.60000000149,
        "downTimeStamp": 10573.60000000149
    },
    {
        "note": 77,
        "upVelocity": 64,
        "downVelocity": 49,
        "upTimeStamp": 11789.60000000149,
        "downTimeStamp": 10583.60000000149
    },
    {
        "note": 80,
        "upVelocity": 64,
        "downVelocity": 37,
        "upTimeStamp": 28602.60000000149,
        "downTimeStamp": 26039.60000000149
    },
    {
        "note": 83,
        "upVelocity": 64,
        "downVelocity": 37,
        "upTimeStamp": 28602.60000000149,
        "downTimeStamp": 26034.60000000149
    }
]
/** */