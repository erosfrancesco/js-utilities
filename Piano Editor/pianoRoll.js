function initPianoRollInterface() {
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

    const notes = [...new Array(88).keys()].map(i => i + 21); // MIDI note numbers from 21 (A0) to 108 (C8)

    notes.forEach(note => NoteTrail(note, el));
};
//

function NoteTrail(note, parent) {
    const el = document.createElement('div');
    el.id = "NoteTrail_" + note;

    el.style.backgroundColor = '#333';
    el.style.boxShadow = '#666 0px 0px 0px 1px inset';
    el.style.width = "100%";
    el.style.height = '2vh';
    el.style.display = 'flex';

    parent.appendChild(el);
}

// TODO: - Set up note position based on start time
// TODO: - Compute marginLeft to apply based on previous notes
function CreateUINote(note, duration = 1000) {
    const trail = document.getElementById('NoteTrail_' + note)
    const el = document.createElement('div');
    el.id = "UINote_" + note;
    el.style.width = (duration / 1000 * 4) + '%';
    el.style.height = '2vh';
    el.style.backgroundColor = 'red';

    // get last child to position after
    const lastChild = trail.lastElementChild;
    const currentLastChildOffset = lastChild ? lastChild.offsetLeft + lastChild.offsetWidth : 0;
    el.style.marginLeft = currentLastChildOffset + 'px';

    trail.appendChild(el);
}
//


let currentNote = null;
function onNoteOn(note) {
    const noteEl = document.getElementById('NoteTrail_' + note);
    noteEl.style.backgroundColor = 'yellow';
}

function onNoteOff(note, duration = 1000) {
    const noteEl = document.getElementById('NoteTrail_' + note);
    noteEl.style.backgroundColor = '#333';
    CreateUINote(note, duration);
}
