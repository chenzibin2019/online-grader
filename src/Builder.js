import GradingGroup from "./components/GradingGroup";
import { useEffect, useState } from "react";
import event from "./utils/event";
import handleAddGroup from "./components/GradingGroup/design/add_group";


const Builder = ({ rubric }) => {
    
    const [designRubric, setDesignRubric] = useState(rubric);

    useEffect(() => {
        event.on("design", (type, data) => {
            const newRubric = {...designRubric};
            if (type === "EDIT_SCORE") {
                const { group, item, score } = data;
                newRubric.rubrics[group].items[item].grade = +score;
                event.emit("message", "Score updated for " + newRubric.rubrics[group].items[item].description + ". New score: " + score);
            }
            if (type === "EDIT_DESC") {
                const { group, item, desc } = data;
                newRubric.rubrics[group].items[item].description = desc;
                event.emit("message", "Description updated for " + newRubric.rubrics[group].items[item].description);
            }
            if (type === "EDIT_CODE") {
                const { group, item, desc } = data;
                if (desc === "") {
                    delete newRubric.rubrics[group].items[item].code;
                    event.emit("message", "Code removed for " + newRubric.rubrics[group].items[item].description);
                }
                newRubric.rubrics[group].items[item].code = desc;
                event.emit("message", "Code updated for " + newRubric.rubrics[group].items[item].description);
            }
            if (type === "EDIT_CHK_SUBMISSION") {
                const { group, check_submission } = data;
                newRubric.rubrics[group].check_submission = check_submission;
                event.emit("message", "Check submission updated for " + newRubric.rubrics[group].name + ". Now, you will " + (check_submission? "" : "not") + " check if student does not submit this section at all.");
            }
            if (type === "DELETE_GROUP") {
                const { group } = data;
                event.emit("message", "Group " + newRubric.rubrics[group].name + " (ID: " + group + ") deleted");
                newRubric.rubrics.splice(group, 1);
            }
            if (type === "EDIT_NAME") {
                const { group, name } = data;
                newRubric.rubrics[group].name = name;
                event.emit("message", "Group " + group + " name updated to " + name);
            }
            if (type === "DELETE_ITEM") {
                const { group, item } = data;
                event.emit("message", "Item " + newRubric.rubrics[group].items[item].description + " deleted from group " + newRubric.rubrics[group].name);
                newRubric.rubrics[group].items.splice(item, 1);
            }
            if (type === "ADD_ITEM") {
                const { group } = data;
                newRubric.rubrics[group].items.push({description: "NEW ITEM", grade: 0, comment: "PLEASE PROVIDE FEEDBACK"});
                event.emit("message", "New item added to group " + newRubric.rubrics[group].name);
            }
            if (type === "ADD_GROUP") {
                newRubric.rubrics.push({name: "NEW GROUP", check_submission: false, items: []});
                event.emit("message", "New group added");
            }
            if (type === "EDIT_CMT") {
                const { group, item, comment } = data;
                newRubric.rubrics[group].items[item].comment = comment;
                event.emit("message", "Comment updated for " + newRubric.rubrics[group].items[item].description);
            }
            setDesignRubric(newRubric);
        });
        return () => {
            event.off("design");
        }
    }, []);

    const handleDownloadJson = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(designRubric)], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "rubric.json";
        document.body.appendChild(element);
        element.click();
    }

    return (
        <div>
            {designRubric.rubrics.map((group, index) => <GradingGroup key={index} group={{ ...group, index }} />)}
            <div className="sidebar">
                <button 
                    className="reset-button primary"
                    onClick={() => handleAddGroup()}
                >
                    Add
                </button>
                <button 
                    className="reset-button"
                    onClick={() => handleDownloadJson()}
                >
                    Download
                </button>
                <button 
                    className="reset-button"
                    onClick={() => {
                        const confirm_reset = window.confirm("Are you sure? All changes will be lost. Make sure you download your work before leaving!");
                        if (!confirm_reset) {
                            return;
                        }
                        event.emit("switch", "INITIAL")
                    }}
                >
                    Back
                </button>
                <button 
                    className="reset-button"
                    onClick={() => event.emit("switch", "GRADER")}
                >
                    Start Grading
                </button>
                {/* <button onClick={()=>document.querySelector("#dog").showModal()}>test</button> */}
            </div>
        </div>
    );
}

export default Builder;