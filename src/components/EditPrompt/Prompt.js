import { useEffect, useRef, useState } from "react";

/**
 * 
 * @param {Object} props configuration
 * @param {String} props.title title of the prompt
 * @param {String} props.content content of the prompt
 * @param {String} props.default_content default content of the prompt
 * @param {Function} props.onConfirm callback function when the user confirms
 * @param {Function} props.onCancel callback function when the user cancels
 * @returns 
 */
const Prompt = (props) => {
    const { title, content, default_content, type, onConfirm, onCancel, unmount } = props;
    const ref = useRef(null);
    const textarea = useRef(null);
    const [value,setValue] = useState(default_content);

    useEffect(() => {
        ref.current.showModal();
        textarea.current.focus();
        // move cursor to the end of the text
        type && ['textarea', 'text'].includes(type) && textarea.current.setSelectionRange(textarea.current.value.length, textarea.current.value.length);
    }, []);

    const close = () => {
        ref.current.close();
        onCancel && onCancel();
        unmount();
    }

    const submit = () => {
        ref.current.close();
        onConfirm(value);
        unmount();
    }
    return (
        <dialog id="prompt" ref={ref}>
            <h2>{title}</h2>
            <p>{content}</p>
            <form onSubmit={submit}>
                {type === "textarea" ? <textarea
                    className="comment"
                    ref={textarea}
                    value={value}
                    rows={1}
                    onChange={(e) => setValue(e.target.value)}
                /> : <input 
                    className="comment"
                    style={{ height: 'initial'}}
                    type={type || "text"}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    ref={textarea}
                />}
                <button className="reset-button primary" type="submit">Submit</button>
                <button className="reset-button" onClick={close}>Cancel</button>
            </form>
        </dialog>
    )
}

export default Prompt;