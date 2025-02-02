
import event from "../../../utils/event";

const handleEditScore = (group, item, score) => {
    const newScore = prompt("Enter the new score", score);
    if (newScore !== null) {
        event.emit("design", "EDIT_SCORE", {group, item, score: newScore});
    }
}

export default handleEditScore;

