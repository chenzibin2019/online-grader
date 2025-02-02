const handleCodeCopy = (e, code) => {
    e.preventDefault();
    navigator.clipboard.writeText(code);
    e.target.style.color = 'green';
    setTimeout(() => {
        e.target.style.color = 'blue';
    }, 2000);
}


export default handleCodeCopy;
