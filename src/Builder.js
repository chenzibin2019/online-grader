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
            }
            if (type === "EDIT_DESC") {
                const { group, item, desc } = data;
                newRubric.rubrics[group].items[item].description = desc;
            }
            if (type === "EDIT_CODE") {
                const { group, item, desc } = data;
                if (desc === "") {
                    delete newRubric.rubrics[group].items[item].code;
                }
                newRubric.rubrics[group].items[item].code = desc;
            }
            if (type === "EDIT_CHK_SUBMISSION") {
                const { group, check_submission } = data;
                newRubric.rubrics[group].check_submission = check_submission;
            }
            if (type === "DELETE_GROUP") {
                const { group } = data;
                newRubric.rubrics.splice(group, 1);
            }
            if (type === "EDIT_NAME") {
                const { group, name } = data;
                newRubric.rubrics[group].name = name;
            }
            if (type === "DELETE_ITEM") {
                const { group, item } = data;
                newRubric.rubrics[group].items.splice(item, 1);
            }
            if (type === "ADD_ITEM") {
                const { group } = data;
                newRubric.rubrics[group].items.push({description: "NEW ITEM", grade: 0, comment: "PLEASE PROVIDE FEEDBACK"});
            }
            if (type === "ADD_GROUP") {
                newRubric.rubrics.push({name: "NEW GROUP", check_submission: false, items: []});
            }
            if (type === "EDIT_CMT") {
                const { group, item, comment } = data;
                newRubric.rubrics[group].items[item].comment = comment;
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
                    className="reset-button"
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
            </div>
        </div>
    );
}

export default Builder;