
import event from "../../../utils/event";

const handleEditCode = (group, item, desc) => {
    const new_desc = prompt("Enter the new code, leave blank to disable this function.", desc);
    if (new_desc !== null) {
        event.emit("design", "EDIT_CODE", {group, item, desc: new_desc});
    }
}

export default handleEditCode;

