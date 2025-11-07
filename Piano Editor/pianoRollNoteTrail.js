const PIXEL_TO_TIME_RATIO = 1000 / 16 / 4; // 1000 ms = 16 * 4 px


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

    addNote(noteRaw, index) {
        // set up marginLeft based on previous note on same trail
        const lastNote = App_Global.notes[(this.el.lastChild || {}).index || 0];
        const marginLeft = noteRaw.downTimeStamp - (lastNote?.noteIndex || 0);

        const duration = noteRaw.upTimeStamp - noteRaw.downTimeStamp
        const noteUI = CreateUINote(duration);
        noteUI.id = "UINote_" + this.el.childNodes.length;
        noteUI.noteIndex = index;
        noteUI.style.marginLeft = (marginLeft / PIXEL_TO_TIME_RATIO) + 'px';
        this.el.appendChild(noteUI);

        return noteUI;
    }
}
//


function CreateUINote(duration = 1000) {
    const el = document.createElement('div');
    el.style.width = (duration / PIXEL_TO_TIME_RATIO) + 'px';
    el.style.height = '2vh';
    el.style.backgroundColor = 'green';
    el.style.boxShadow = 'lime 0px 0px 2px 1px inset';

    return el;
}
//
