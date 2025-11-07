// Note data structure
class NoteRaw {
    constructor(note, velocity, timeStamp, upTimeStamp = timeStamp, upVelocity = velocity) {
        this.note = note;
        this.upVelocity = upVelocity;
        this.downVelocity = velocity;
        this.upTimeStamp = upTimeStamp;
        this.downTimeStamp = timeStamp;
    }
}

// Note event from MIDI input
class NoteEvent extends NoteRaw {
    constructor(event) {
        const data = event.data,
            note = data[1],
            velocity = data[2],
            timeStamp = event.timeStamp;
        super(note, velocity, timeStamp);

        // with pressure and tilt off
        // note off: 128, cmd: 8 
        // note on: 144, cmd: 9
        // pressure / tilt on
        // pressure: 176, cmd 11: 
        // bend: 224, cmd: 14
    }

    onKeyUp(event) {
        const data = event.data,
            velocity = data[2],
            timeStamp = event.timeStamp;

        this.upVelocity = velocity;
        this.upTimeStamp = timeStamp;
    }
}

// Current notes being played
class CurrentNotesPlaying {
    constructor() {
        this.notes = {};
    }

    onStart(evn) {
        const noteEvent = new NoteEvent(evn);
        this.notes[noteEvent.note] = noteEvent;

        const trail = App_Global.UI.pianoRoll.trails[noteEvent.note - 21];
        trail.onNotePlaying();
    }

    onEnd(evn) {
        // set up end timestamp and velocity
        const note = evn.data[1];
        this.notes[note].onKeyUp(evn);

        // save note data to App_Global.notes, then remove it from currentNotes
        App_Global.notes.push(this.notes[note]);
        delete this.notes[note];

        // update UI
        const trail = App_Global.UI.pianoRoll.trails[note - 21];
        trail.onNoteEnd();
    }
}


// MIDI note event handler
function onMIDINote(event) {
    const type = event.data[0] & 0xf0; // channel agnostic message type. Thanks, Phil Burk.

    switch (type) {
        case 144: // noteOn message 
            App_Global.currentNotes.onStart(event);
            break;
        case 128: // noteOff message 
            App_Global.currentNotes.onEnd(event);
            break;
    }
}
