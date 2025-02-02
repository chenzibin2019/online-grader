
import event from "../../../utils/event";

const handleEditComments = (group, item, comments) => {
    const new_comment = prompt("Enter the new comment", comments);
    if (new_comment !== null) {
        event.emit("design", "EDIT_CMT", {group, item, comment: new_comment});
    }
}

export default handleEditComments;

