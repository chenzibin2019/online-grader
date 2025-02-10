
import event from "../../../utils/event";
import showPrompt from "../../EditPrompt";

const handleEditCode = (group, item, desc) => showPrompt({
    title: "Edit Code",
    content: "Enter the new code for testing, leave blank to disable this function.",
    default_content: desc,
    onConfirm: (new_desc) => {
        event.emit("design", "EDIT_CODE", {group, item, desc: new_desc});
    },
})
//     {
//     const new_desc = prompt("Enter the new code, leave blank to disable this function.", desc);
//     if (new_desc !== null) {
//         event.emit("design", "EDIT_CODE", {group, item, desc: new_desc});
//     }
// }

export default handleEditCode;

