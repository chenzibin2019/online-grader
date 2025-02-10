
import event from "../../../utils/event";
import showPrompt from "../../EditPrompt";

const submitEditScore = (group, item, score) => {
    event.emit("design", "EDIT_SCORE", {group, item, score});
}

const handleEditScore = (group, item, score) => showPrompt({
    title: "Edit Score",
    content: "Enter the new score",
    default_content: score,
    type: "number",
    onConfirm: submitEditScore.bind(null, group, item),
})

export default handleEditScore;

