let __node_id = 0;

const CreateNode = (props = {}) => {
    const { label = 'New Node' } = props;
    const div = document.createElement('div');
    div.className = 'node-wrapper';

    const header = document.createElement('span');
    header.className = 'title';
    header.innerHTML = label;
    div.appendChild(header);

    const content = document.createElement('div');
    content.className = 'node-content';
    div.appendChild(content);

    div.nodeProps = {
        content, header
    }

    div.isEqualTo = (node2) => {
        const { nodeProps } = node2 || {};
        const { id } = nodeProps;

        return div.nodeProps.id === id;
    }

    div.delete = () => {
        div.parentElement.removeChild(div);
    }

    const nodeWithSockets = NodeSocketAdapter(div);
    const draggableNode = NodeDraggableAdapter(nodeWithSockets);
    const selectableNode = MakeNodeSelectable(draggableNode);

    return selectableNode;
}

const AppendNode = (node) => {
    node.style.position = 'absolute';
    node.style.top = '50%';
    node.style.left = '50%';

    node.nodeProps.id = __node_id;
    __node_id++;

    App_Global.UI.editor.appendChild(node);
}
