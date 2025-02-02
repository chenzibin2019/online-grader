
import event from "../../../utils/event";

const handleAddGroup = () => {
    event.emit("design", "ADD_GROUP", null);
}

export default handleAddGroup;

