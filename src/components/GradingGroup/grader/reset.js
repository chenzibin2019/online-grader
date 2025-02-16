import event from "../../../utils/event";


const reset = (group, grading) => {
    if (grading[group.index] && grading[group.index].includes(-1)) {
        event.emit("grading", group.index, -1, false);
    }
    group.items.forEach((element, index) => {
        event.emit("grading", group.index, index, false);
    });
}

export default reset;