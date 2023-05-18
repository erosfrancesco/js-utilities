const createNodeElementFromObject = (obj = {}) => {

    const { label, inputs = {}, outputs = {} } = obj;


    const node = CreateNode({
        label
    });
    AppendNode(node);

    Object.keys(inputs).forEach((label) => {
        const props = inputs[label];

        const socket = CreateSocket({ label, ...props });
        AppendSocket(socket, node);
    })

    Object.keys(outputs).forEach((label) => {
        const props = outputs[label];

        const socket = CreateSocket({ isOutput: true, label, ...props });
        AppendSocket(socket, node);
    })

    return node;
}

App_Global.UI.AddPressed = () => {}
App_Global.UI.DeletePressed = () => {}
App_Global.UI.SpacePressed = () => {}

window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
      return;
    }

    if (event.code === "Delete") {
        App_Global.UI.DeletePressed();
    }

    if (event.code === "Space") {
        App_Global.UI.SpacePressed();
    }

    if (event.code === "KeyA") {
        App_Global.UI.AddPressed();
    }
})