import total from "./total";
import event from "../../utils/event";
import correct from "./grader/correct";
import handleCodeCopy from "./grader/copy_code";
import handleEditScore from "./design/edit_score";
import handleEditDescription from "./design/edit_desc";
import handleEditCode from "./design/edit_code";
import handleEditCheckSubmission from "./design/edit_check_submission";
import handleDeleteGroup from "./design/delete_group";
import handleEditGroupName from "./design/edit_group_name";
import handleDeleteItem from "./design/delete_item";
import handleAddItem from "./design/add_item";

const GradingGroup = ({ group, grading }) => {
    const mode = grading ? "GRADER" : "BUILDER";
    const isDesigning = mode === "BUILDER";
    
    
    return <div className="group">
        <h2>{group.name} ({total(group)}pts) 
            {!isDesigning && <span 
                onClick={() => correct(group, grading)}
                className={`correct ${isDesigning || grading[group.index] && grading[group.index].includes(-1) && "disabled"}`}
            > [Correct]</span>}
            {isDesigning && <>
                <i className={`fa fa-pen`} style={{ fontSize: '19px', margin: '5px', cursor: 'pointer'}} onClick={() => handleEditGroupName(group.index, group.name)} />
                <i className={`fa-regular fa-eye${group.check_submission ? "" : "-slash"}`} style={{ fontSize: '20px', margin: '5px', cursor: 'pointer'}} onClick={() => handleEditCheckSubmission(group.index, !group.check_submission)} />
                <i className={`fa fa-xmark`} style={{ fontSize: '20px', margin: '5px', cursor: 'pointer'}} onClick={() => handleDeleteGroup(group.index, group.name)} />
            </>}
        </h2>
        {group.check_submission && (
            <label key={`grading-item-nosub-${group.index}`} className={`item ${isDesigning && "disabled"}`}>
                {!isDesigning && <input
                    type="checkbox"
                    checked={!isDesigning && grading[group.index] && grading[group.index].includes(-1)}
                    onChange={(e) => {
                        event.emit("grading", group.index, -1, e.target.checked);
                    }}
                />}
                {!isDesigning && <span className="checkmark"></span>}
                <span className="description negative">
                    {!isDesigning && "No submission"}
                </span>
            </label>
        )}
        {group.items.map((item, item_index) => (
            <div key={`grading-item-${group.index}-${item_index}`}>
                <label className={`item ${!isDesigning && grading[group.index] && !!grading[group.index].includes(-1) && "disabled"}`}>
                    {!isDesigning && <input
                        type="checkbox"
                        checked={!isDesigning && grading[group.index] && grading[group.index].includes(item_index)}
                        disabled={isDesigning || grading[group.index] && !!grading[group.index].includes(-1)}
                        onChange={(e) => {
                            event.emit("grading", group.index, item_index, e.target.checked);
                        }}
                    />}
                    {!isDesigning && <span className="checkmark"></span>}
                    {!isDesigning && item.code && <i className="fa fa-code" style={{ fontSize: '15px', margin: '5px', color: 'blue'}} onClick={(e) => handleCodeCopy(e, item.code)} />}
                    {isDesigning && <i className="fa fa-xmark" style={{ fontSize: '16px', margin: '5px', cursor: 'pointer'}} onClick={() => handleDeleteItem(group.index, item.description, item_index)}/>}
                    <span className={`description ${item.grade < 0 && "negative"}`}>
                        {item.description}
                        {isDesigning && <>
                            <i className="fa fa-pen" style={{ fontSize: '10px', margin: '5px', cursor: 'pointer'}} onClick={() => handleEditDescription(group.index, item_index, item.description)} />
                            <i className="fa fa-code" style={{ fontSize: '10px', margin: '5px', cursor: 'pointer', color: item.code? 'green': 'inherit'}} onClick={() => handleEditCode(group.index, item_index, item.code)} />
                            <i className="fa fa-message" style={{ fontSize: '10px', margin: '5px', cursor: 'pointer'}} onClick={() => handleEditScore(group.index, item_index, item.grade)} />
                        </>}
                    </span>
                    <span className="grade">
                        ({item.grade} pts)
                        {isDesigning && <i className="fa fa-pen" style={{ fontSize: '10px', margin: '5px', cursor: 'pointer'}} onClick={() => handleEditScore(group.index, item_index, item.grade)} />}
                    </span>
                </label>
            </div>
        ))}

        {isDesigning && <div style={{position: "relative", height: "30px"}} key={`grading-item-${group.index}-add`} onClick={() => handleAddItem(group.index)}>
            <label className="item-add">
                <i className="fa fa-add" style={{ fontSize: '16px', margin: '5px', cursor: 'pointer'}} onClick={() => {}}/>
                <span className={`description`}>
                    Add item
                </span>
            </label>
        </div>}
    </div>
}

export default GradingGroup; 