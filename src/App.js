import Project3 from './Project3';
import { reader } from './utils/rubric';
import Grader from './Grader';
import { useState } from 'react';

const App = () => {
    const [rubric, setRubric] = useState({});
    const [mode, setMode] = useState("INITIAL");

    const loadRubric = async () => {
        const rubric = await reader();
        setRubric(rubric);
        setMode("GRADER");
        console.log(rubric);
    }

    return (
        <div className="container">
            <div id="header">
                <h1>Welcome to User Online Grading System</h1>
                <hr />
            </div>
            {mode === "INITIAL" && <div className="function-buttons">
                <button className="button grader-button" onClick={loadRubric}>Grader</button>
                <button className="button builder-button">Builder</button>
            </div>}
            {mode === "GRADER" && <Grader rubric={rubric}/>}
            {/* <Project3 /> */}
        </div>
    );
}

export default App;


