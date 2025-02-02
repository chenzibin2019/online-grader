import event from "../../../utils/event";


const correct = (group, grading) => {
    if (grading[group.index] && grading[group.index].includes(-1)) {
        return;
    }
    group.items.forEach((element, index) => {
        element.grade > 0 && event.emit("grading", group.index, index, true);
    });
}

export default correct;