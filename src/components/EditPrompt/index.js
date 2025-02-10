import ReactDOM from 'react-dom/client';
import React from 'react';
import Prompt from './Prompt';

let ins;
let root_dom;

const unmount = () => {
    ins.unmount();
    root_dom.remove();
}


const showPrompt = (props) => {
    if (ins) {
        unmount()
    }
    const prompt_root_dom = document.createElement('div')
    prompt_root_dom.id = 'prompt-root'
    document.getElementById("root").appendChild(prompt_root_dom)
    const prompt_root = ReactDOM.createRoot(prompt_root_dom)
    const prompt_props = {
        ...props,
        unmount: unmount
    }
    
    prompt_root.render(
        <React.StrictMode>
            <Prompt {...prompt_props} />
        </React.StrictMode>
    )

    ins = prompt_root;
    root_dom = prompt_root_dom;
    return unmount;
}

export default showPrompt;

