const SocketLineAdapter = (socket, isOutput) => {

    socket.socketProps.lines = socket.socketProps.lines || [];
    
    socket.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // save clicked on UI selected
        App_Global.UI.Selected = App_Global.UI.Selected || {};
        App_Global.UI.Selected[isOutput ? 'outputNode' : 'inputNode'] = socket;
        const { inputNode, outputNode } = App_Global.UI.Selected;

        // check if a line must be draw
        // also check if a line has already been drawn between the input/output sockets
        const mustDrawLine = (isOutput && inputNode) || (!isOutput && outputNode);
        
        if (mustDrawLine && !checkIfSocketsAreConnected(inputNode, outputNode)) {
            const line = CreateSocketLine(outputNode, inputNode);
            AttachSocketLine(line, inputNode, outputNode);

            inputNode.socketProps.lines.push(line);
            outputNode.socketProps.lines.push(line);

            App_Global.UI.Selected.outputNode = null;
            App_Global.UI.Selected.inputNode = null;

            line.onclick = () => {
                console.log('You Clicked line')
            }
        }
    }

    socket.forEachLine = (f = (i) => { return i }) => {
        return socket.socketProps.lines.map(f);
    }

    return socket;
}

const checkIfSocketsAreConnected = (input, output) => {
    const lineId = input.socketProps.id + '-' + output.socketProps.id;
    const items = input.socketProps.lines.filter(line => line.lineProps.id === lineId);

    return items.length;
}