App_Global.UI.Selected = App_Global.UI.Selected || {};
App_Global.UI.Selected.nodeSelected = App_Global.UI.Selected.nodeSelected || null;

const MakeNodeSelectable = (node) => {
    node.onclick = (e) => {
        App_Global.UI.DeletePressed = () => {};
        const { nodeSelected: oldSelected } = App_Global.UI.Selected;

        if (!oldSelected) {
            onNodeSelected(node);
            return;
        }

        oldSelected.className = 'node-wrapper';

        if (oldSelected.isEqualTo && oldSelected.isEqualTo(node)) {
            App_Global.UI.Selected.nodeSelected = null;
            return;
        }

        onNodeSelected(node);
    }

    return node;
}

const onNodeSelected = (node) => {
    App_Global.UI.Selected.nodeSelected = node;
    node.className = 'node-wrapper node-selected';

    App_Global.UI.DeletePressed = () => {
        // delete this node
        node.delete();
        App_Global.UI.Selected.nodeSelected = null;
        App_Global.UI.DeletePressed = () => {}
    }
}