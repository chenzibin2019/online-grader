
import event from "../../../utils/event";

const handleAddItem = (group) => {
    event.emit("design", "ADD_ITEM", {group});
}

export default handleAddItem;

