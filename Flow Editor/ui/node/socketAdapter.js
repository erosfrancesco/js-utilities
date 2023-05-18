const NodeSocketAdapter = (node) => {
    const inputs = document.createElement('div');
    inputs.className = 'node-sockets-adapter node-socket-inputs';

    node.nodeProps.content.appendChild(inputs);

    
    const outputs = document.createElement('div');
    outputs.className = 'node-sockets-adapter node-socket-outputs';

    node.nodeProps.content.appendChild(outputs);

    const computeMinHeightOfContent = () => {
        const nInputs = sockets.inputs.items.length;
        const nOutputs = sockets.outputs.items.length;
        const nItems = Math.max(nInputs, nOutputs) + 1;

        node.nodeProps.content.style.minHeight = nItems * 1 + 'rem';
    }

    const sockets = {
        inputs: {
            add: (socket) => {
                inputs.appendChild(socket);
                sockets.inputs.items.push(socket);

                computeMinHeightOfContent();
            },
            remove: (socket) => {
                const i = sockets.inputs.items.indexOf(socket);
                const removed = sockets.inputs.items.splice(i, 0);
                
                computeMinHeightOfContent();
            },
            items: []
        },
        outputs: {
            add: (socket) => {
                outputs.appendChild(socket);
                sockets.outputs.items.push(socket);

                computeMinHeightOfContent();
            },
            remove: (socket) => {
                const i = sockets.outputs.items.indexOf(socket);
                const removed = sockets.outputs.items.splice(i, 0);
                console.log(removed);
                computeMinHeightOfContent();
            },
            items: []
        }
    };
    node.nodeProps.sockets = sockets;

    return node;
}