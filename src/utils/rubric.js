
const rubric_reader = async () => {
    // open file dialog
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    return new Promise((resolve) => {
        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                const rubric = JSON.parse(e.target.result);
                resolve(rubric);
            }
            reader.readAsText(file);
        }
        input.click();
    });
}

export const reader = rubric_reader;

