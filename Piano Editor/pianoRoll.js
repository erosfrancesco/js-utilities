const TrailToShowFrom = 70; // 21 (A0) to 108 (C8)
const TrailToShowTo = 108;

class PianoRoll {
    constructor() {
        // UI
        const el = document.createElement('div');
        el.id = 'Piano_Roll_Editor';

        el.style.backgroundColor = 'black';
        el.style.color = 'green';
        el.style.maxHeight = '80vh';
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
            noteTrail.el.style.display = (note >= TrailToShowFrom && note < TrailToShowTo) ? 'block' : 'none';

            return noteTrail;
        });
    }

    loadFromJSON(data) {
        App_Global.notes = data.map((noteData, i) => {
            const { note, downVelocity, downTimeStamp, upVelocity, upTimeStamp } = noteData;
            const noteEv = new NoteRaw(note, downVelocity, downTimeStamp, upTimeStamp, upVelocity);
            this.trails[noteEv.note - 21].addNote(noteEv, i);

            return noteEv;
        });
    }
}

function initPianoRollInterface() {
    App_Global.UI.pianoRoll = new PianoRoll();
};
//

