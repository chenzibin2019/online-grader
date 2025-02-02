
import event from "../../../utils/event";

const handleEditCheckSubmission = (group, check_submission) => {
    event.emit("design", "EDIT_CHK_SUBMISSION", {group, check_submission});
}

export default handleEditCheckSubmission;

