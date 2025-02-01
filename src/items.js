const groups = [
    {
        id: 1,
        name: 'Pixel Class',
        check_submission: true,
        items: [
            {
                id: 1,
                grade: 5,
                description: 'Test option1: Generate 10 points at random',
                comment: 'Failed with test option 1',
            },
            {
                id: 2,
                grade: 5,
                description: 'Test option2: Generate 10 points at random (using modulo)',
                comment: 'Failed test option2',
            },
            {
                id: 3,
                grade: 5,
                description: 'Test option3: Move one point along a square',
                comment: 'Failed test option3',
            },
            {
                id: 4,
                grade: 5,
                description: 'Test option4: Move four point along a square',
                comment: 'Failed test option4',
            },
            {
                id: 5,
                grade: 5,
                description: 'Test option5: Move one point any direction -use arrow commands',
                comment: 'Failed test option5',
            },
            {
                id: 6,
                grade: -5,
                description: 'Change the nrow and ncol in student\'s code, test 5',
                comment: 'Your Pixel class failed to respond correctly when we change the nrow/ncol attribute. Perhaps you hardcoded the values in the class?',
            },
        ],
    },
    {
        id: 2,
        name: 'Grid Class',
        check_submission: true,
        items: [
            {
                id: 8,
                grade: 5,
                description: 'Click on a black cell and you should observe a new pixel showed up',
                comment: 'Your Grid class does not add Pixel properly when mouse click is performed',
            },
            {
                id: 9,
                grade: 5,
                description: 'Right click on a pixel and you should observe the pixel disappeared',
                comment: 'Your code does not remove the pixel when we right click on a pixel',
            },
            {
                id: 10,
                grade: 5,
                description: 'Right click on a empty cell and you should observe the flushing row',
                comment: 'Your code does not generate the flushing row when we right click on a empty cell',
            },
            {
                id: 11,
                grade: 5,
                description: 'Right click on a empty cell and you should observe the top row is falling down',
                comment: 'Your code pixels not going down when we right click on a empty cell',
            },
            {
                id: 12,
                grade: -5,
                description: 'Change the nrow and ncol in student\'s code',
                comment: 'Your Grid class failed to respond correctly when we change the nrow/ncol attribute. Perhaps you hardcoded the values in the class?',
            },

        ],
    },
    {
        id: 3,
        name: 'Tetrominoes Class',
        check_submission: true,
        items: [
            {
                id: 14,
                grade: 5,
                description: 'Test option 1: Generate a Tetromino (basic shape)- different options',
                comment: 'Failed test option 1',
            },
            {
                id: 15,
                grade: 5,
                description: 'Test option 2: Generate a \'square\' Tetromino (with double shape) and rotate',
                comment: 'Failed test option 2',
            },
            {
                id: 16,
                grade: 5,
                description: 'Use custom shape. You should observe an X shape and Y shape',
                comment: 'Your code failed to handle custom shape',
                code: "[np.array([[3, 0, 3], [3, 0, 3], [0, 3, 0], [3, 0, 3], [3, 0, 3]]), np.array([[3, 0, 3], [3, 0, 3], [0, 3, 0], [0, 3, 0], [0, 3, 0]])]",
            },
            {
                id: 17,
                grade: 5,
                description: 'Test option 3: Dancing Tetrominoes',
                comment: 'Failed test option 3',
            },
            {
                id: 18,
                grade: 5,
                description: 'Test option 4: Moving Tetromino',
                comment: 'Failed test option 4',
            },

        ],
    },
    {
        id: 4,
        name: 'Snake Class',
        check_submission: true,
        items: [
            {
                id: 20,
                grade: -5,
                description: 'See if they hard coded the number of blocks and the number of fruits',
                comment: 'You hard coded the number of blocks and the number of fruits',
            },
            {
                id: 21,
                grade: 4,
                description: 'See if their snake initialized correctly',
                comment: 'Your snake failed to initialized correctly',
            },
            {
                id: 22,
                grade: 5,
                description: 'See if their snake move correctly',
                comment: 'Your snake does not move',
            },
            {
                id: 23,
                grade: -1,
                description: 'Check this if their snake move randomly, e.g., move like a stack',
                comment: 'Your snake move incorrectly',
            },
            {
                id: 24,
                grade: 3,
                description: 'Check if their snake eat the fruit correctly (has to grow and continue move)',
                comment: 'Your snake does not eat the fruit correctly (e.g., does not grow, does not move after eating)',
            },
            {
                id: 25,
                grade: 3,
                description: 'Check if their game exit correctly when eat all fruits',
                comment: 'Your game does not exit correctly (prompt the user they win) when eat all fruits',
            },
            {
                id: 26,
                grade: 3,
                description: 'Check if their game over function correctly when hit a brick',
                comment: 'Your game does not over correctly (prompt the user they failed). Either your game does not over when hit a brick or your game over when not suppose to',
            },
            {
                id: 27,
                grade: 2,
                description: 'Check if pause and resume function correctly',
                comment: 'Your game does not pause and resume correctly',
            },

        ],
    },
    {
        id: 5,
        name: 'Tetris Class',
        check_submission: true,
        items: [
            {
                id: 29,
                grade: 2,
                description: 'Check if pause and resume function correctly',
                comment: 'Your game does not pause and resume correctly',
            },
            {
                id: 30,
                grade: 5,
                description: 'Check if their movement function correctly (press left, right, space)',
                comment: 'Your tetris does not move/rotate correctly',
            },
            {
                id: 31,
                grade: -2,
                description: 'Check this if their teris overlaps during movement',
                comment: 'Your tetris overlaps',
            },
            {
                id: 32,
                grade: 3,
                description: 'Check this their tetris flush and remove one line when a whole line is full',
                comment: 'Your tetris does not flush and remove one line when a whole line is full',
            },
            {
                id: 33,
                grade: 3,
                description: 'Press down and you should see the tetris falls to the bottom directly',
                comment: 'Your tetris does not fall to the bottom directly when press down',
            },
            {
                id: 34,
                grade: 3,
                description: 'Let the tetris fall and you should see the tetris stop at the correct position',
                comment: 'Your tetris does not stop at the correct position when fall to the bottom',
            },
            {
                id: 35,
                grade: 2,
                description: 'Push the tetris to the right and you should see the tetris does not go "into" the right tetris',
                comment: 'Your tetris go into the other tetris when push to the right',
            },
            {
                id: 36,
                grade: 2,
                description: 'Let tetris stack and you should see Game Over',
                comment: 'Your tetris does not exit correctly when Game Over',
            },

        ]
    },
    {
        id: 6,
        name: 'Miscellaneous',
        items: [
            {
                id: 37,
                grade: -3,
                description: 'Check this if they don\'t have docstring',
                comment: 'You don\'t have docstring',
            },
            {
                id: 38,
                grade: -2,
                description: 'Check this if they don\'t have comments',
                comment: 'You don\'t have comments',
            },
            {
                id: 39,
                grade: -3,
                description: 'Check this if not submitting the correct file (e.g., zipping files, change file name, etc)',
                comment: 'Your file submission does not meet our requirement (e.g., zipping files, change file name, etc)',
            }
        ]
    }
];

export default groups;