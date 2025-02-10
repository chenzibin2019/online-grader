
import event from "../../../utils/event";
import showPrompt from "../../EditPrompt";

const handleEditComments = (group, item, comments) => showPrompt({
    title: "Edit Comments",
    content: "Enter the new comment. Note: this will appear at the composed comments to students.",
    default_content: comments,
    type: "textarea",
    onConfirm: (new_comment) => {
        event.emit("design", "EDIT_CMT", {group, item, comment: new_comment});
    },
})
//     {
//     const new_comment = prompt("Enter the new comment", comments);
//     if (new_comment !== null) {
//         event.emit("design", "EDIT_CMT", {group, item, comment: new_comment});
//     }
// }

export default handleEditComments;

