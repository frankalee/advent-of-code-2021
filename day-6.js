import { readAllLines } from './util.js';

const DAYS = 256;

const input = readAllLines('./data/day-6/day-6.txt')[0].split(/,/).map(x => parseInt(x.trim(), 10));
const fish = [...Array(DAYS + 10)].fill(0);

for (const i of input) {
    fish[i+1] += 1;
}

for (let i = 1; i <= DAYS; ++i) {
    fish[i+7] += fish[i];
    fish[i+9] += fish[i];
    fish[i] = 0;
}

console.table(fish);
console.log(fish.reduce((a, b) => a + b, 0));