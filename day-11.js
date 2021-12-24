import { readAllLines } from './util.js';

const input = readAllLines('./data/day-11/day-11.txt').map(x => x.split('').map(x => parseInt(x.trim(), 10)));
console.table(input);

const step = (input) => {
    let flashes = 0;

    // Increase all by 1
    for (let i = 0; i < 10; ++i) {
        for (let j = 0; j < 10; ++j) {
            input[i][j] += 1;
        }
    }

    let f = flash(input);
    let newFlashes = f.flashes;
    let updatedInput = f.input;

    while (newFlashes > 0) {
        flashes += newFlashes;

        f = flash(updatedInput);
        newFlashes = f.flashes;
        updatedInput = f.input;
    }

    return { flashes, updatedInput };
}

const flash = (input) => {
    let flashes = 0;
    //console.table(input);
    for (let i = 0; i < 10; ++i) {
        for (let j = 0; j < 10; ++j) {
            if (input[i][j] >= 10) {
                ++flashes;
                input[i][j] = 0;

                if (i > 0 && j > 0 && input[i - 1][j - 1] != 0) { input[i - 1][j - 1] += 1; }
                if (j > 0 && input[i][j - 1] != 0) { input[i][j - 1] += 1; }
                if (i < 9 && j > 0 && input[i + 1][j - 1] != 0) { input[i + 1][j - 1] += 1; }
                if (i > 0 && input[i - 1][j] != 0) { input[i - 1][j] += 1; }
                if (i < 9 && input[i + 1][j] != 0) { input[i + 1][j] += 1; }
                if (i > 0 && j < 9 && input[i - 1][j + 1] != 0) { input[i - 1][j + 1] += 1; }
                if (j < 9 && input[i][j + 1] != 0) { input[i][j + 1] += 1; }
                if (i < 9 && j < 9 && input[i + 1][j + 1] != 0) { input[i + 1][j + 1] += 1; }
            }
        }
    }

    return { flashes, input };
}

let totalFlashes = 0;
let vInput = input;

for (let i = 0; i < 10000; ++i) {
    let f = step(vInput);
    let newFlashes = f.flashes;

    totalFlashes += newFlashes;
    vInput = f.updatedInput;

    if (newFlashes === 100) {
        console.log(`Sync! ${i + 1}`);
        break;
    }
}

console.log(totalFlashes);