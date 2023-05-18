let __socket_id = 0;

const CreateSocket = (props = {}) => {
    const {
        isOutput = false,
        label = '',
        type = 'any'
    } = props;

    const div = document.createElement('div');
    div.className = 'socket-wrapper ' + (isOutput ? 'socket-output' : 'socket-input');
    div.socketProps = {
        isOutput,
        type
    };

    const titleLabel = document.createElement('span');
    titleLabel.className = 'socket-label'
    titleLabel.innerHTML = label;
    div.appendChild(titleLabel);

    div.isEqualTo = (item) => {
        const { socketProps } = item || {};
        const { id } = socketProps;

        return div.socketProps.id === id;
    }

    return SocketLineAdapter(div, isOutput);
}

const AppendSocket = (socket, node) => {
    const { isOutput } = socket.socketProps;
    const { sockets } = node.nodeProps;
    const socketManager = isOutput ? sockets.outputs : sockets.inputs;

    socket.socketProps.id = __socket_id
    __socket_id++;

    socketManager.add(socket);
}