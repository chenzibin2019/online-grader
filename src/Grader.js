import GradingGroup from "./components/GradingGroup";
import { useState, useEffect, useRef } from "react";
import event from "./utils/event";
import TotalScore from "./components/TotalScore";
import Comments from "./components/Comments";

const Grader = ({ rubric }) => {
    const not_graded = {...rubric.rubrics.reduce((cur, rub, index) => ({...cur, [index]: []}), {})}
    const [currentGrading, setCurrentGrading] = useState(not_graded); // group_index -> [selected items]
    const totalRef = useRef(null);

    const onGrading = (group_index, item_index, value) => {
        
        setCurrentGrading((prevGrading) => {
            const newGrading = { ...prevGrading };

            if (!newGrading[group_index]) {
                newGrading[group_index] = [];
            }
            if (value && !newGrading[group_index].includes(item_index)) {
                newGrading[group_index].push(item_index);
            } else if (!value && newGrading[group_index].includes(item_index)) {
                if (newGrading[group_index]) {
                    newGrading[group_index] = newGrading[group_index].filter((i) => i !== item_index);
                }
            }            
            return newGrading;
        });
    }


    useEffect(() => {
        event.on("grading", onGrading);
        return () => {
            event.off("grading", onGrading);
        }
    }, [])
    return (
        <div>
            <div
                className="to-result primary"
                onClick={() => {
                    totalRef.current.scrollIntoView({ behavior: "smooth" });
                }}
            >Show Results</div>
            {rubric.rubrics.map((group, index) => <GradingGroup key={index} group={{ ...group, index }} grading={currentGrading} />)}
            <div className="sidebar">
                <button 
                    className="reset-button"
                    onClick={() => setCurrentGrading(not_graded)}
                >
                    Reset
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
                    onClick={() => event.emit("switch", "BUILDER")}
                >
                    Edit Rubric
                </button>
                <div
                    ref={totalRef}
                >
                    <TotalScore 
                        grading={currentGrading} 
                        rubrics={rubric.rubrics}
                    />
                    <Comments
                        grading={currentGrading}
                        rubrics={rubric.rubrics}
                    />
                </div>
            </div>
        </div>
    );
}

export default Grader;