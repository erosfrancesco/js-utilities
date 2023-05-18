// Make the DIV element draggable

const dragMouseDown = (elmnt, pos1, pos2, pos3, pos4) => (e) => {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag(elmnt, pos1, pos2, pos3, pos4);
}

const elementDrag = (elmnt, pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0) => (e) => {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    elmnt.onNodeDragging(elmnt.offsetLeft - pos1, elmnt.offsetTop - pos2)
}

function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
}

function makeElementDraggable(elmnt, handle) {
    handle = handle || elmnt;
    handle.onmousedown = dragMouseDown(elmnt);
    elmnt.onNodeDragging = elmnt.onNodeDragging || function() {};
    handle.style.cursor = 'grab';
}