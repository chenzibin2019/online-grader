

const getTotalScore = (grading, rubrics) => {
    let total = 0;
    rubrics.forEach((element, group_index) => {
        const checked = grading[group_index] || [];
        if (checked.includes(-1)) {
            return;
        }
        
        element.items.forEach((item, item_index) => {
            const is_checked = checked.includes(item_index);
            is_checked && (total += item.grade);
        })
    });

    
    return total;
}

export default getTotalScore;
