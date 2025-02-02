
import event from "../../../utils/event";

const handleEditGroupName = (group, name) => {
    const new_name = prompt("Enter the new name", name);
    if (new_name !== null) {
        event.emit("design", "EDIT_NAME", {group, name: new_name});
    }
}

export default handleEditGroupName;

