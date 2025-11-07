function initMidiInterface() {
    const el = App_Global.UI.headerBar;
    el.style.backgroundColor = 'black';
    el.style.color = 'green';
    el.style.padding = '1em';
    el.style.minHeight = '4em';
    el.style.overflowY = 'auto';

    const connect = document.createElement('button');
    connect.innerText = 'Connect MIDI Device';
    connect.onclick = () => {
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess({ sysex: true }).then(onMIDIDeviceSuccess, onMIDIDeviceFailure);
        } else {
            alert("No MIDI support in your browser.");
        }
    };
    App_Global.UI.editor.appendChild(connect);
};
//

// set up audio context
const context = new (AudioContext || webkitAudioContext)(); // for ios/safari
console.log('AudioContext', context);

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({ sysex: false }).then(onMIDIDeviceSuccess, onMIDIDeviceFailure);
} else {
    alert("No MIDI support in your browser.");
}
//

// midi functions
function onMIDIDeviceSuccess(midiDevice) {

    console.log('midiDevice', midiDevice);

    const inputs = midiDevice.inputs.values();

    App_Global.UI.headerBar.innerHTML += '<strong>MIDI Interface Initialized.</strong><br />';

    // loop through all inputs
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        // listen for midi messages
        input.value.onmidimessage = onMIDINote;
        App_Global.UI.headerBar.innerHTML += `<p>[Connected]: ${input.value.name}</p>`;
    }

    // listen for connect/disconnect message
    midiDevice.onstatechange = onMIDIDeviceChange;
}

function onMIDIDeviceFailure(e) {
    console.log("No access to MIDI devices:", e);
}


function onMIDIDeviceChange(event) {
    console.log(event, 'MIDI Change Event');
}
//


//
function onMIDINote(event) {
    // console.log('MIDI Note Event', event);
    const data = event.data,
        type = data[0] & 0xf0, // channel agnostic message type. Thanks, Phil Burk.
        note = data[1],
        velocity = data[2],
        timeStamp = event.timeStamp;
    // with pressure and tilt off
    // note off: 128, cmd: 8 
    // note on: 144, cmd: 9
    // pressure / tilt on
    // pressure: 176, cmd 11: 
    // bend: 224, cmd: 14
    switch (type) {
        case 144: // noteOn message 
            console.log('note on', note, velocity, timeStamp);
            App_Global.currentNotes[note] = { lastOn: timeStamp, velocity };
            onNoteOn(note);
            break;
        case 128: // noteOff message 
            console.log('note off', note, velocity, timeStamp);
            App_Global.currentNotes[note].lastOff = timeStamp;
            const { lastOff, lastOn } = App_Global.currentNotes[note];

            const duration = lastOff - lastOn;
            onNoteOff(note, duration);
            break;
    }
}