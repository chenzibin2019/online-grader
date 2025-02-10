
import event from "../../../utils/event";
import showPrompt from "../../EditPrompt";

const handleEditDescription = (group, item, desc) => showPrompt({
    title: "Edit Description",
    content: "Enter the new description",
    default_content: desc,
    onConfirm: (new_desc) => {
        event.emit("design", "EDIT_DESC", {group, item, desc: new_desc});
    },
})
//     {
//     const new_desc = prompt("Enter the new description", desc);
//     if (new_desc !== null) {
//         event.emit("design", "EDIT_DESC", {group, item, desc: new_desc});
//     }
// }

export default handleEditDescription;

