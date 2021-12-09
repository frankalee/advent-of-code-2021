import { readAllLines } from './util.js';

const input = readAllLines('./data/day-8/day-8.txt');
const tenInput = input.map(x => x.split(/\|/)[0].trim()).map(x => x.split(/ /));
const fourInput = input.map(x => x.split(/\|/)[1].trim()).map(x => x.split(/ /));

// Question part 1

// let count1478 = 0;
// for (const x of fourInput) {
//     for (const y of x) {
//         switch (y.length) {
//             case 2:
//             case 3:
//             case 4:
//             case 7:
//                 ++count1478;
//         }
//     }
// }
// console.log(count1478);

// Part 2 rough algorithm
// acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf 5353
// ab = 1
// dab = 7
//  d = top piece
// eafb = 4
//  ea = top left, middle
// 9 = 4 + top + bottom
//  x = bottom
// 3 = 1 + top + bottom + middle
//  y = middle
// 4 = 1 + middle + top left
//  z = top left
// 5 = top, bottom, middle, top left, r
//  r = bottom right
// 1 = bottom right, top right
// leftover = bottom left

const fromSegments = (segs, top, bottom, middle, topLeft, topRight, bottomLeft, bottomRight) => {
    switch (segs.length) {
        case 2: return 1;
        case 3: return 7;
        case 4: return 4;
        case 7: return 8;
        case 5:
            if (!segs.includes(topLeft) && !segs.includes(bottomRight)) { return 2; }
            if (!segs.includes(topLeft) && !segs.includes(bottomLeft)) { return 3; }
            return 5;
        case 6:
            if (!segs.includes(middle)) { return 0; }
            if (!segs.includes(topRight)) { return 6; }
            return 9;
    }
}

let part2Sum = 0;
for (let i = 0; i < tenInput.length; ++i) {
    const ten = tenInput[i];

    const one = ten.filter(x => x.length == 2)[0];
    const oneVals = one.split('');

    const seven = ten.filter(x => x.length == 3)[0];
    const sevenVals = seven.split('');

    const four = ten.filter(x => x.length == 4)[0]
    const fourVals = four.split('');

    const nine = ten.filter(x => x.length == 6 && x.includes(fourVals[0]) && x.includes(fourVals[1])
        && x.includes(fourVals[2]) && x.includes(fourVals[3]))[0];
    const nineVals = nine.split('');

    const top = sevenVals.filter(x => !oneVals.includes(x))[0];
    const bottom = nineVals.filter(x => x != top).filter(x => !fourVals.includes(x))[0];

    const three = ten.filter(x => x.length == 5 && x.includes(oneVals[0]) && x.includes(oneVals[1]) && x.includes(top) && x.includes(bottom))[0];
    const threeVals = three.split('');

    const middle = threeVals.filter(x => x != top).filter(x => x != bottom).filter(x => !oneVals.includes(x))[0];
    const topLeft = fourVals.filter(x => x != middle).filter(x => !oneVals.includes(x))[0];

    const five = ten.filter(x => x.length == 5 && x.includes(top) && x.includes(bottom) && x.includes(middle) && x.includes(topLeft))[0];
    const fiveVals = five.split('');

    const bottomRight = fiveVals.filter(x => x != top).filter(x => x != bottom).filter(x => x != middle).filter(x => x != topLeft)[0];
    const topRight = oneVals.filter(x => x != bottomRight)[0];
    const bottomLeft = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
        .filter(x => x != top).filter(x => x != bottom).filter(x => x != middle)
        .filter(x => x != topLeft).filter(x => x != bottomRight).filter(x => x != topRight)[0];

    const a = fourInput[i];
    const result = 1000 * fromSegments(a[0], top, bottom, middle, topLeft, topRight, bottomLeft, bottomRight) +
        100 * fromSegments(a[1], top, bottom, middle, topLeft, topRight, bottomLeft, bottomRight) +
        10 * fromSegments(a[2], top, bottom, middle, topLeft, topRight, bottomLeft, bottomRight) +
        1 * fromSegments(a[3], top, bottom, middle, topLeft, topRight, bottomLeft, bottomRight);

    console.log(result);
    part2Sum += result;
}

console.log(part2Sum);