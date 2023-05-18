const NodeDraggableAdapter = (node) => {
    const { nodeProps } = node;
    const { header, sockets } = nodeProps;

    // drag
    makeElementDraggable(node, header);
    node.onNodeDragging = (x, y) => {
        const {inputs, outputs} = sockets
        inputs.items.forEach(input => input.forEachLine(line => updateInputLine(input, line)))
        outputs.items.forEach(output => output.forEachLine(line => updateOutputLine(output, line)))
    }

    return node;
}

const updateInputLine = (socket, line) => {
    const {x, y} = socket.getBoundingClientRect();

    line.setAttribute('x2', x);
    line.setAttribute('y2', y - 100);

    return line;
}

const updateOutputLine = (socket, line) => {
    const {x, y} = socket.getBoundingClientRect();

    line.setAttribute('x1', x);
    line.setAttribute('y1', y - 100);

    return line;
}