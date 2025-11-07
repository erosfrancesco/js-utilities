const PIXEL_TO_TIME_RATIO = 1000 / 16; // 1000 ms = 16 px

class PianoRoll {
    constructor() {
        // UI
        const el = document.createElement('div');
        el.id = 'Piano_Roll_Editor';

        el.style.backgroundColor = 'black';
        el.style.color = 'green';
        el.style.maxHeight = '40vh';
        el.style.maxWidth = '80vw';
        el.style.width = '100%';
        el.style.height = '100%';
        el.style.overflowY = 'auto';

        App_Global.UI.editor.appendChild(el);
        //

        const notes = [...new Array(88).keys()].map(i => i + 21); // MIDI note numbers from 21 (A0) to 108 (C8)
        this.trails = notes.map(note => {
            const noteTrail = new NoteTrail(note);
            el.appendChild(noteTrail.el);

            return noteTrail;
        });
    }

    loadFromJSON(data) {
        App_Global.notes = data.map((noteData, i) => {
            const { note, downVelocity, downTimeStamp, upVelocity, upTimeStamp } = noteData;
            const noteEv = new NoteRaw(note, downVelocity, downTimeStamp, upTimeStamp, upVelocity);
            this.trails[noteEv.note].addNote(noteEv, i);

            return noteEv;
        });
    }
}

class NoteTrail {
    constructor(note) {
        const el = document.createElement('div');
        el.id = "NoteTrail_" + note;

        el.style.backgroundColor = '#333';
        el.style.boxShadow = '#666 0px 0px 0px 1px inset';
        el.style.width = "100%";
        el.style.height = '2vh';
        el.style.display = 'flex';

        this.el = el;
    }

    onNotePlaying() {
        this.el.style.backgroundColor = 'gold';
    };

    onNoteEnd() {
        this.el.style.backgroundColor = '#333';
    };

    addNote(noteEvent, index) {
        // set up marginLeft based on start time and previous note on same trail
        const lastNote = App_Global.notes[(this.el.lastChild || {}).index || 0];
        // TODO: - Set up note position based on start time
        const marginLeft = noteEvent.downTimeStamp - (lastNote?.noteIndex || 0);

        const noteUI = CreateUINote(noteEvent.duration);
        noteUI.id = "UINote_" + this.el.childNodes.length;
        noteUI.noteIndex = index;
        noteUI.style.marginLeft = (marginLeft / PIXEL_TO_TIME_RATIO) + 'px';
        this.el.appendChild(noteUI);

        return noteUI;
    }
}

function initPianoRollInterface() {
    App_Global.UI.pianoRoll = new PianoRoll();
};
//


function CreateUINote(duration = 1000) {
    const el = document.createElement('div');
    el.style.width = (duration / PIXEL_TO_TIME_RATIO) + 'px';
    el.style.height = '2vh';
    el.style.backgroundColor = 'red';

    return el;
}
//
