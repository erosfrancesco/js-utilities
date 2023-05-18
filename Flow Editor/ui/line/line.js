const setupLinesWrapper = () => {
    const wrapper = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    const { offsetWidth, offsetHeight } = App_Global.UI.editor;

    wrapper.setAttribute('width', offsetWidth);
    wrapper.setAttribute('height', offsetHeight);

    App_Global.UI.editor.appendChild(wrapper);
    App_Global.UI.editor.lines = wrapper;

    return wrapper;
}

const CreateSocketLine = (inputSocket, outputSocket) => {
    const {x, y} = App_Global.UI.editor.lines.getBoundingClientRect();
    const {x: x1, y: y1, height, width} = inputSocket.getBoundingClientRect();
    const {x: x2, y: y2} = outputSocket.getBoundingClientRect();
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    
    line.setAttribute('x1', x1 - x - (width / 2));
    line.setAttribute('y1', y1 - y + (height / 2));
    line.setAttribute('x2', x2 - x - (width / 2));
    line.setAttribute('y2', y2 - y + (height / 2));

    line.setAttribute('stroke', 'rgb(255,0,0)');
    line.setAttribute('stroke-width', 2);

    return line;
}

const AttachSocketLine = (line, inputSocket, outputSocket) => {
    line.lineProps = {
        inputSocket,
        outputSocket,
        id: inputSocket.socketProps.id + '-' + outputSocket.socketProps.id
    };

    line.isEqualTo = (item) => {
        const { lineProps } = item || {};
        const { id } = lineProps;

        return line.lineProps.id === id;
    }

    App_Global.UI.editor.lines.appendChild(line);
    return line;
}