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
            // noteTrail.el.style.display = (note >= this.rangeSection.from && note < this.rangeSection.to) ? 'block' : 'none';

            return noteTrail;
        });

        this.rangeSection = new PianoRollRangeSection(TrailToShowFrom, TrailToShowTo, () => this.updateVisibleRange());
        const rangeSectionLayout = document.createElement('div');
        rangeSectionLayout.style.display = 'flex';
        rangeSectionLayout.style.marginBottom = '1em';
        rangeSectionLayout.style.gap = '1em';
        rangeSectionLayout.appendChild(this.rangeSection.fromInput);
        rangeSectionLayout.appendChild(this.rangeSection.toInput);
        el.prepend(rangeSectionLayout);
        rangeSectionLayout.prepend(document.createTextNode('Show Notes '));

        this.updateVisibleRange();
    }

    loadFromJSON(data) {
        App_Global.notes = data.map((noteData, i) => {
            const { note, downVelocity, downTimeStamp, upVelocity, upTimeStamp } = noteData;
            const noteEv = new NoteRaw(note, downVelocity, downTimeStamp, upTimeStamp, upVelocity);
            this.trails[noteEv.note - 21].addNote(noteEv, i);

            return noteEv;
        });
    }

    updateVisibleRange() {
        this.trails.forEach((trail, i) => {
            const note = i + 21;
            trail.el.style.display = (note >= this.rangeSection.from && note < this.rangeSection.to) ? 'block' : 'none';
        });
    }
}

function initPianoRollInterface() {
    App_Global.UI.pianoRoll = new PianoRoll();
};
//

class PianoRollRangeSection {
    constructor(from = 21, to = 108, onUpdate = () => {}) {
        this.from = from;
        this.to = to;

        this.fromInput = document.createElement('div');

        const fromLabel = document.createElement('span');
        fromLabel.innerText = 'From:';
        this.fromInput.appendChild(fromLabel);

        const fromInput = document.createElement('input');
        fromInput.type = 'number';
        fromInput.value = this.from;
        fromInput.min = 21;
        fromInput.max = 108;
        this.fromInput.onchange = (e) => {
            this.from = parseInt(e.target.value, 10);
            onUpdate();
        };
        this.fromInput.appendChild(fromInput);

        this.toInput = document.createElement('div');

        const toLabel = document.createElement('span');
        toLabel.innerText = 'To:';
        this.toInput.appendChild(toLabel);

        const toInput = document.createElement('input');
        toInput.type = 'number';
        toInput.value = this.to;
        toInput.min = 21;
        toInput.max = 108;
        toInput.onchange = (e) => {
            this.to = parseInt(e.target.value, 10);
            onUpdate();
        };
        this.toInput.appendChild(toInput);
    }
}