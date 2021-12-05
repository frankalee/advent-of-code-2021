import { readAllLines } from './util.js';

const sumBoard = board => board.reduce((prev, curr) => prev + curr.reduce((p2, c2) => p2 + (c2 === -1 ? 0 : c2), 0), 0);

const checkBoard = board => {
    let isWinner = false;

    // Check Rows
    for (let i = 0; i < 5 && !isWinner; ++i) {
        if (board[i].reduce((p, c) => p + c, 0) === -5) {
            isWinner = true;
        }
    }

    // Check Columns
    for (let i = 0; i < 5 && !isWinner; ++i) {
        if (board[0][i] + board[1][i] + board[2][i] + board[3][i] + board[4][i] === -5) {
            isWinner = true;
        }
    }

    if (isWinner) {
        return sumBoard(board);
    }

    return 0;
}

const processBoardsForWinner = (chosen, boards) => {
    for (const c of chosen) {
        for (const board of boards) {
            for (let i = 0; i < 5; ++i) {
                for (let j = 0; j < 5; ++j) {
                    if (board[i][j] === c) {
                        board[i][j] = -1;
                        const check = checkBoard(board);
                        if (check > 0) {
                            console.log(c);
                            console.log(check);
                            console.log(c * check);
                            return;
                        }
                    }
                }
            }
        }
    }
}

const updateBoards = (choice, boards) => {
    for (const board of boards) {
        for (let i = 0; i < 5; ++i) {
            for (let j = 0; j < 5; ++j) {
                if (board[i][j] === choice) {
                    board[i][j] = -1;
                }
            }
        }
    }

    return boards;
}

const processBoardsForLoser = (chosen, boards) => {
    let tempBoards = boards;

    for (const c of chosen) {
        tempBoards = updateBoards(c, tempBoards);

        if (tempBoards.length === 1) {
            const check = checkBoard(tempBoards[0]);
            if (check > 0) {
                console.log(c);
                console.log(check);
                console.log(c * check);
                return;
            }
        }
        else {
            const losingBoards = [];
            for (const board of tempBoards) {
                const check = checkBoard(board);
                if (check === 0) {
                    losingBoards.push(board);
                }
            }
            tempBoards = losingBoards;
        }
    }
}

const input = readAllLines('./data/day-4/day-4.txt');
const chosen = input[0].split(',').map(x => parseInt(x.trim(), 10));

let inputRow = 1;
const boards = [];

while (inputRow < input.length) {
    const board = [];
    for (let i = 1; i <= 5; ++i) {
        board.push(input[inputRow + i].split(' ').filter(x => x !== '').map(x => parseInt(x, 10)));
    }

    boards.push(board);
    inputRow += 6;
}

//processBoardsForWinner(chosen, boards);
processBoardsForLoser(chosen, boards);