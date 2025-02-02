
import { useRef } from "react";
import total from "../GradingGroup/total";

const Comments = ({ grading, rubrics }) => {

    const commentRef = useRef(null);

    const copy = () => {
        if (commentRef.current) {
            commentRef.current.select();
            document.execCommand('copy');
        }
    }

    let comments = '';
    rubrics.forEach((element, group_index) => {
        const checked = grading[group_index] || [];
        if (checked.includes(-1)) {
            comments += `[${element.name}] -${total(element)}pts, No submission or does not work at all.\n`;
            return;
        }
        
        element.items.forEach((item, item_index) => {
            const is_checked = checked.includes(item_index);
            if (item.grade > 0 && !is_checked) {
                comments += `[${element.name}] -${item.grade}pts, ${item.comment}\n`;
            } else if (item.grade <= 0 && is_checked) {
                comments += `[${element.name}] -${-item.grade}pts, ${item.comment}\n`;
            }
        })
    });

    
    return <div className="comment-container">
        <p className="comment-label">Comment: [<a className="copy-link" onClick={copy}>Copy</a>]</p>
        <textarea 
            className="comment"
            value={comments}
            ref={commentRef}
        ></textarea>
    </div>
}


export default Comments;