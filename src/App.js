import { reader } from './utils/rubric';
import Grader from './Grader';
import Builder from './Builder';
import { useEffect, useState } from 'react';
import event from './utils/event';

const App = () => {
    const [rubric, setRubric] = useState({});
    const [mode, setMode] = useState("INITIAL");
    const [message, setMessage] = useState(null);
    const [messageQueue, setMessageQueue] = useState([]);

    const loadBuilder = async () => {
        const load = window.confirm("Do you want to load existing rubric?");
        let rubric = {rubrics: [{"name":"NEW GROUP","check_submission":false,"items":[]}]};
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
        event.on("message", (message) => {
            setMessageQueue(prev => [...prev, message]);
        })
        return () => {
            event.off("switch");
            event.off("message");
        }
    }, []);

    useEffect(() => {
        if (messageQueue.length === 0) {
            setMessage(null);
            return;
        }
        setMessage(messageQueue[0]);
        const interval = setInterval(() => {
            setMessageQueue(prev => {
                if (prev.length === 0) {
                    setMessage(null);
                    clearInterval(interval);
                    return [];
                }
                return prev.slice(1);
            })
        }, 3000);

        return () => clearInterval(interval);
    }, [messageQueue]);

    return (
        <div className="container">
            {message && <div className="info">
                {message}
            </div>}
            <div id="header">
                <h1>Welcome to Online Grading System</h1>
                <hr />
            </div>
            {mode === "INITIAL" && <div className="function-buttons">
                <button className="button builder-button" onClick={loadGrader}><i className="fa fa-check-double" />Grader</button>
                <button className="button builder-button" onClick={loadBuilder}> <i className="fa fa-pencil"/>Builder</button>
                {/* <button className="button builder-button" onClick={loadBuilder}> <i className="fa-solid fa-book-open"/>Instructions</button> */}
            </div>}
            {mode === "GRADER" && <Grader rubric={rubric}/>}
            {mode === "BUILDER" && <Builder rubric={rubric}/>}
        </div>
    );
}

export default App;


