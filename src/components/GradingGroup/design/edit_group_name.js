
import event from "../../../utils/event";
import showPrompt from "../../EditPrompt";

const handleEditGroupName = (group, name) => showPrompt({
    title: "Edit Name",
    content: "Enter the new name",
    default_content: name,
    onConfirm: (new_name) => {
        event.emit("design", "EDIT_NAME", {group, name: new_name});
    },
})
// {
//     const new_name = prompt("Enter the new name", name);
//     if (new_name !== null) {
//         event.emit("design", "EDIT_NAME", {group, name: new_name});
//     }
// }

export default handleEditGroupName;

