
import event from "../../../utils/event";

const handleEditDescription = (group, item, desc) => {
    const new_desc = prompt("Enter the new description", desc);
    if (new_desc !== null) {
        event.emit("design", "EDIT_DESC", {group, item, desc: new_desc});
    }
}

export default handleEditDescription;

