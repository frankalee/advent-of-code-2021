import { readAllLines } from './util.js';

const input = readAllLines('./data/day-7/day-7.txt')[0].split(/,/).map(x => parseInt(x.trim(), 10));

const loc = new Map();
for (const i of input) {
    if (loc.has(i)) {
        loc.set(i, loc.get(i) + 1);
    }
    else {
        loc.set(i, 1);
    }
}

const locs = Array.from(loc.keys());
const maxLoc = Math.max(...locs);

let minFuel = 999999999;
for (let i = 0; i <= maxLoc; ++i) {
    let fuel = 0;
    for (const l of locs) {
        const n = Math.abs(l - i);
        fuel += ((n * (n + 1)) / 2) * loc.get(l);
    }

    if (fuel < minFuel) {
        minFuel = fuel;
    }
}

console.log(minFuel);