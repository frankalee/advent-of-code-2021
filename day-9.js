import { readAllLines } from './util.js';

const input = readAllLines('./data/day-9/day-9.txt').map(x => x.split('').map(x => parseInt(x.trim(), 10)));
console.table(input);

const w = input[0].length;
const h = input.length;

const low = [];

for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
        // Up
        if (y != 0) {
            if (input[y][x] >= input[y-1][x]) {
                continue;
            }
        }

        // Down
        if (y != (h - 1)) {
            if (input[y][x] >= input[y+1][x]) {
                continue;
            }
        }

        // Left
        if (x != 0) {
            if (input[y][x] >= input[y][x-1]) {
                continue;
            }
        }
        
        // Right
        if (x != (w - 1)) {
            if (input[y][x] >= input[y][x+1]) {
                continue;
            }
        }

        low.push({
            x: x,
            y: y
        });
    }
}

console.log(low);

let riskTotal = 0;
for (const l of low) {
    riskTotal += (input[l.y][l.x]) + 1;
}

console.log(riskTotal);