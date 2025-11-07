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

/** */
// set up audio context
const context = new (AudioContext || webkitAudioContext)(); // for ios/safari
console.log('AudioContext', context);

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({ sysex: false }).then(onMIDIDeviceSuccess, onMIDIDeviceFailure);
} else {
    alert("No MIDI support in your browser.");
}
/** */

// midi functions
function onMIDIDeviceSuccess(midiDevice) {

    // console.log('midiDevice', midiDevice);

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
    // console.log("No access to MIDI devices:", e);
}


function onMIDIDeviceChange(event) {
    // console.log(event, 'MIDI Change Event');
}
//