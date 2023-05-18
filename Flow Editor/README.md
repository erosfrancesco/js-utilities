# JS Flow Editor

## UI Components

- Node
- Socket ( Inputs/Outputs of nodes )
- Line ( links between input and output sockets )

## UI Logic

Adapters for cross-component logic.

- Component ids -x-
- Component References on UI Manager
- Component selectable -x-
- Create / Delete Nodes (Sockets are built from params)
    1. Create Node                   -x-
    2. Draggable Node (update Lines) -x-
    3. Delete Node (optional for now...)
    4. Make room for Node content (optional for now...)
    5. Rename title label
- Create / Delete Lines (Also update nodes sockets)
    1. Create Line -x-
    2. Delete Line
    3. Check existing lines -x-
    4. Create different Line styles (curves)
- Load / Save snapshot of current flow
- Set execution begin / end points
- Execute current flow
- Update Node content
