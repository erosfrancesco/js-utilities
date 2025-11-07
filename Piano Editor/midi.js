function initMidiInterface() {
    const el = App_Global.UI.headerBar;
    el.style.backgroundColor = 'black';
    el.style.color = 'green';
    el.style.padding = '1em';
    el.style.minHeight = '4em';
    el.style.overflowY = 'auto';
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

// midi functions
function onMIDIDeviceSuccess(midiDevice) {
    const inputs = midiDevice.inputs.values();

    App_Global.UI.headerBar.innerHTML += '<strong>MIDI Interface Initialized.</strong><br />';

    // loop through all inputs
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        // listen for midi messages
        input.value.onmidimessage = console.log;
        App_Global.UI.headerBar.innerHTML += `<p>[Connected]: ${input.value.name}</p>`;
    }

    // listen for connect/disconnect message
    midiDevice.onstatechange = onMIDIDeviceChange;
}

function onMIDIDeviceFailure(e) {
    console.log("No access to MIDI devices:", e);
}


function onMIDIDeviceChange(event) {
    // console.log(event, 'MIDI Change Event');
}
//


/*
function onMIDIMessage(event) {
    data = event.data,
        cmd = data[0] >> 4,
        channel = data[0] & 0xf,
        type = data[0] & 0xf0, // channel agnostic message type. Thanks, Phil Burk.
        note = data[1],
        velocity = data[2];
    // with pressure and tilt off
    // note off: 128, cmd: 8 
    // note on: 144, cmd: 9
    // pressure / tilt on
    // pressure: 176, cmd 11: 
    // bend: 224, cmd: 14
    console.log('MIDI data', data);
    switch (type) {
        case 144: // noteOn message 
            noteOn(note, velocity);
            break;
        case 128: // noteOff message 
            noteOff(note, velocity);
            break;
    }
 
    console.log(keyData, 'key data', data);
}
 
 
function noteOn(midiNote, velocity) {
    player(midiNote, velocity);
}
 
function noteOff(midiNote, velocity) {
    player(midiNote, velocity);
}
 
function player(note, velocity) {
    var sample = sampleMap['key' + note];
    if (sample) {
        if (type == (0x80 & 0xf0) || velocity == 0) { //needs to be fixed for QuNexus, which always returns 144
            btn[sample - 1].classList.remove('active');
            return;
        }
        btn[sample - 1].classList.add('active');
        btn[sample - 1].play(velocity);
    }
}
/** */