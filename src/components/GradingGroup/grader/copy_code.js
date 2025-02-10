import event from "../../../utils/event";


const handleCodeCopy = (e, code) => {
    e.preventDefault();
    navigator.clipboard.writeText(code);
    e.target.style.color = 'green';
    event.emit("message", "Code copied to clipboard" + Math.random());
    setTimeout(() => {
        e.target.style.color = 'blue';
    }, 3000);
}


export default handleCodeCopy;
