import { reader } from './utils/rubric';
import Grader from './Grader';
import Builder from './Builder';
import { useEffect, useState } from 'react';
import event from './utils/event';

const App = () => {
    const [rubric, setRubric] = useState({});
    const [mode, setMode] = useState("INITIAL");

    const loadBuilder = async () => {
        const load = window.confirm("Do you want to load the previous rubric?");
        let rubric = {rubrics: []};
        if (load) {
            rubric = await reader();
        } 
        setRubric(rubric);
        setMode("BUILDER");
    }

    const loadGrader = async () => {
        const rubric = await reader();
        setRubric(rubric);
        setMode("GRADER");
        console.log(rubric);
    }

    useEffect(() => {
        event.on("switch", (mode) => {
            setMode(mode);
        });
        return () => {
            event.off("switch");
        }
    }, []);

    return (
        <div className="container">
            <div id="header">
                <h1>Welcome to Online Grading System</h1>
                <hr />
            </div>
            {mode === "INITIAL" && <div className="function-buttons">
                <button className="button grader-button" onClick={loadGrader}><i className="fa fa-check-double" style={{ fontSize: '20px', margin: '5px'}} />Grader</button>
                <button className="button builder-button" onClick={loadBuilder}> <i className="fa fa-pencil" style={{ fontSize: '20px', margin: '5px'}} />Builder</button>
            </div>}
            {mode === "GRADER" && <Grader rubric={rubric}/>}
            {mode === "BUILDER" && <Builder rubric={rubric}/>}
        </div>
    );
}

export default App;


