import ReactDOM from 'react-dom/client';
import React from 'react';
import DragDropUploadDialog from './DragDropUploadDialog';

let ins;
let root_dom;

const unmount = () => {
    ins.unmount();
    root_dom.remove();
}


const showDragDropUploadDialog = () => {
    let res;
    const promise = new Promise(resolve => {
        res = resolve;
    });

    const onfile = (file) => {
        res(file);
        unmount();
    }
    if (ins) {
        unmount()
    }
    const drag_drop_dom = document.createElement('div')
    drag_drop_dom.id = 'drag-drop-root'
    document.getElementById("root").appendChild(drag_drop_dom)
    const drag_drop_root = ReactDOM.createRoot(drag_drop_dom)
    const uploader_props = {
        unmount, onfile
    }
    
    drag_drop_root.render(
        <React.StrictMode>
            <DragDropUploadDialog {...uploader_props} />
        </React.StrictMode>
    )

    ins = drag_drop_root;
    root_dom = drag_drop_dom;

    return promise;
    
}

export default showDragDropUploadDialog;

