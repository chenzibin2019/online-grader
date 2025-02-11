

const getTotalScore = (grading, rubrics) => {
    let total = 0;
    let full_mark = 0;
    rubrics.forEach((element, group_index) => {
        const checked = grading[group_index] || [];
        if (checked.includes(-1)) {
            return;
        }

        element.items.forEach((item, item_index) => {
            const is_checked = checked.includes(item_index);
            is_checked && (total += item.grade);
            item.grade > 0 && (full_mark += item.grade);
        })
    });


    return { total, full_mark };
}

export default getTotalScore;
