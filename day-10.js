import { readAllLines } from './util.js';

const input = readAllLines('./data/day-10/day-10.txt');
//console.table(input);

const scoreMap = new Map();
scoreMap.set(')', 3);
scoreMap.set(']', 57);
scoreMap.set('}', 1197);
scoreMap.set('>', 25137);

const autoCompleteScores = [];

let score = 0;
for (const line of input) {
    const stack = [];

    let brk = false;
    for (let i = 0; i < line.length && !brk; ++i) {
        const c = line[i];
        if (c === '(' || c === '[' || c === '{' || c === '<') {
            stack.push(line[i]);
            continue;
        }

        const s = stack.pop();
        if (c === ')') {
            if (s !== '(') {
                score += scoreMap.get(c);
                brk = true;
            }
        }

        if (c === ']') {
            if (s !== '[') {
                score += scoreMap.get(c);
                brk = true;
            }
        }

        if (c === '}') {
            if (s !== '{') {
                score += scoreMap.get(c);
                brk = true;
            }
        }

        if (c === '>') {
            if (s !== '<') {
                score += scoreMap.get(c);
                brk = true;
            }
        }
    }

    if (!brk) {
        console.log(stack);

        let autoScore = 0;
        while (stack.length > 0) {
            const close = stack.pop();
            autoScore *= 5;

            if (close === '(') {
                autoScore += 1;
            }

            if (close === '[') {
                autoScore += 2;
            }

            if (close === '{') {
                autoScore += 3;
            }

            if (close === '<') {
                autoScore += 4;
            }
        }

        autoCompleteScores.push(autoScore);
    }
}

console.log(score);

const sortedScores = autoCompleteScores.sort(function (a, b) {
    return a - b;
});
console.log(sortedScores);

console.log(sortedScores[Math.floor(sortedScores.length / 2)]);