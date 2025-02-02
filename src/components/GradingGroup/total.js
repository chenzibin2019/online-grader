const total = (group) => 
    group.items.reduce((acc, item) => item.grade > 0 ? acc + item.grade : acc, 0);

export default total;

