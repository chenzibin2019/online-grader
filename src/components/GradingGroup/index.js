import total from "./total";
import event from "../../utils/event";

const GradingGroup = ({ group, grading }) => {

    const correct = () => {
        if (grading[group.index] && grading[group.index].includes(-1)) {
            return;
        }
        group.items.forEach((element, index) => {
            element.grade > 0 && event.emit("grading", group.index, index, true);
        });
    }
    return <div className="group">
        <h2>{group.name} ({total(group)}pts) 
            <span 
                onClick={correct}
                className={`correct ${grading[group.index] && grading[group.index].includes(-1) && "disabled"}`}
            > [Correct]</span>
        </h2>
        {group.check_submission && (
            <label key={`grading-item-nosub-${group.index}`} className="item">
                <input
                    type="checkbox"
                    checked={grading[group.index] && grading[group.index].includes(-1)}
                    onChange={(e) => {
                        event.emit("grading", group.index, -1, e.target.checked);
                    }}
                />
                <span className="checkmark"></span>
                <span className="description negative">
                    No submission
                </span>
            </label>
        )}
        {group.items.map((item, item_index) => (
            <div key={`grading-item-${group.index}-${item_index}`}>
                <label className={`item ${grading[group.index] && !!grading[group.index].includes(-1) && "disabled"}`}>
                    <input
                        type="checkbox"
                        checked={grading[group.index] && grading[group.index].includes(item_index)}
                        disabled={grading[group.index] && !!grading[group.index].includes(-1)}
                        onChange={(e) => {
                            event.emit("grading", group.index, item_index, e.target.checked);
                        }}
                    />
                    <span className="checkmark"></span>
                    <span className={`description ${item.grade < 0 && "negative"}`}>
                        {item.description}
                    </span>
                    <span className="grade">({item.grade} pts)</span>
                </label>
            </div>
        ))}
    </div>
}

export default GradingGroup;