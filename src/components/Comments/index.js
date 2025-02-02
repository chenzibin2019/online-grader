
import { useEffect, useRef, useState } from "react";
import total from "../GradingGroup/total";

const Comments = ({ grading, rubrics }) => {
    const [comment, setComment] = useState('');
    const commentRef = useRef(null);

    const copy = () => {
        if (commentRef.current) {
            commentRef.current.select();
            document.execCommand('copy');
        }
    }

    useEffect(() => {
        let sys_comments = '';
        rubrics.forEach((element, group_index) => {
            const checked = grading[group_index] || [];
            if (checked.includes(-1)) {
                sys_comments += `[${element.name}] -${total(element)}pts, No submission or does not work at all.\n`;
                return;
            }
            
            element.items.forEach((item, item_index) => {
                const is_checked = checked.includes(item_index);
                if (item.grade > 0 && !is_checked) {
                    sys_comments += `[${element.name}] -${item.grade}pts, ${item.comment}\n`;
                } else if (item.grade <= 0 && is_checked) {
                    sys_comments += `[${element.name}] -${-item.grade}pts, ${item.comment}\n`;
                }
            })
        });
        setComment(sys_comments);
    }, [grading]);

    
    return <div className="comment-container">
        <p className="comment-label">Comment: [<a className="copy-link" onClick={copy}>Copy</a>]</p>
        <textarea 
            className="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
            ref={commentRef}
        ></textarea>
    </div>
}


export default Comments;