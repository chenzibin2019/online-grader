
import event from "../../../utils/event";

const handleDeleteGroup = (group, name) => {
    const confirm_delete = window.confirm(`Are you sure you want to delete group ${name}? All grading ruburics will be lost.`);
    if (!confirm_delete) {
        return;
    }
    event.emit("design", "DELETE_GROUP", {group});
}

export default handleDeleteGroup;

