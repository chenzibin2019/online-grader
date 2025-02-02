
import event from "../../../utils/event";

const handleDeleteItem = (group, name, item) => {
    const confirm_delete = window.confirm(`Are you sure you want to delete item ${name}? All grading configuration will be lost.`);
    if (!confirm_delete) {
        return;
    }
    console.log("Delete item", group, item, name);
    
    event.emit("design", "DELETE_ITEM", {group, item});
}

export default handleDeleteItem;

