import fs from 'fs';

import { readAllLines } from './util';

const day3 = () => {
    const input = fs.readFileSync('./data/day-3/day-3.txt', 'utf8');
    const data = input.split('\n')
        .map(x => x.trim())
        .map(x => x.split(''));

    const w = data[0].length;
    const h = data.length;

    const gamma = [];
    const epsilon = [];

    for (let i = 0; i < w; ++i) {
        let zeroCount = 0;
        let oneCount = 0;

        for (let j = 0; j < h; ++j) {
            if (data[j][i] === '1') {
                ++oneCount;
            }
            else {
                ++zeroCount;
            }
        }

        if (zeroCount >= oneCount) {
            gamma.push('0');
            epsilon.push('1');
        }
        else {
            gamma.push('1');
            epsilon.push('0');
        }
    }

    const gammaInt = parseInt(gamma.join(''), 2);
    const epsilonInt = parseInt(epsilon.join(''), 2);

    console.log(gammaInt);
    console.log(epsilonInt);
    console.log(gammaInt * epsilonInt);

    const oxygen = [];
    const scrubber = [];

    oxygen.push(...data);

    for (let i = 0; i < w; ++i) {
        let zeroCount = 0;
        let oneCount = 0;

        if (oxygen.length === 1) {
            continue;
        }

        for (let j = 0; j < oxygen.length; ++j) {
            if (oxygen[j][i] === '1') {
                ++oneCount;
            }
            else {
                ++zeroCount;
            }
        }

        let filter = '1';
        if (zeroCount > oneCount) {
            filter = '0';
        }

        const filtered = oxygen.filter(x => x[i] === filter);

        oxygen.splice(0, oxygen.length);
        oxygen.push(...filtered);

    }

    scrubber.push(...data);

    for (let i = 0; i < w; ++i) {
        let zeroCount = 0;
        let oneCount = 0;

        if (scrubber.length === 1) {
            continue;
        }

        for (let j = 0; j < scrubber.length; ++j) {
            if (scrubber[j][i] === '1') {
                ++oneCount;
            }
            else {
                ++zeroCount;
            }
        }

        let filter = '1';
        if (zeroCount <= oneCount) {
            filter = '0';
        }

        const filtered = scrubber.filter(x => x[i] === filter);
        scrubber.splice(0, scrubber.length);
        scrubber.push(...filtered);
        console.log(scrubber);
    }

    const oxygenInt = parseInt(oxygen[0].join(''), 2);
    const scrubberInt = parseInt(scrubber[0].join(''), 2);

    console.log(oxygenInt);
    console.log(scrubberInt);
    console.log(oxygenInt * scrubberInt);
}

day3();

// DAY 2
const day2 = () => {
    const input = fs.readFileSync('./data/day-2/day-2.txt', 'utf8');
    const nav = input.split('\n')
        .map(x => x.split(' '))
        .map(x => { return { direction: x[0], value: parseInt(x[1], 10) } });

    let horiz = 0;
    let vert = 0;
    let aim = 0;

    for (const n of nav) {
        if (n.direction === 'forward') {
            horiz += n.value;
            vert += (n.value * aim);
        }
        else if (n.direction === 'up') {
            aim -= n.value;
        }
        else if (n.direction === 'down') {
            aim += n.value;
        }

        console.log(`${horiz},${vert}`);
    }

    console.log(horiz);
    console.log(vert);
}

//day2();

// DAY 1