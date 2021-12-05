import { readAllLines } from './util.js';

const initField = (points) => {
    const maxX1 = Math.max.apply(Math, points.map(p => { return p.x1; }))
    const maxX2 = Math.max.apply(Math, points.map(p => { return p.x2; }))
    const maxY1 = Math.max.apply(Math, points.map(p => { return p.y1; }))
    const maxY2 = Math.max.apply(Math, points.map(p => { return p.y2; }))

    const field = [...Array(Math.max(maxX1, maxX2) + 1)].map(x => Array(Math.max(maxY1, maxY2) + 1).fill(0));
    for (const point of points) {
        if (point.x1 === point.x2) {
            let y1, y2;
            if (point.y1 <= point.y2) {
                y1 = point.y1;
                y2 = point.y2;
            }
            else {
                y2 = point.y1;
                y1 = point.y2;
            }

            for (let y = y1; y <= y2; ++y) {
                field[point.x1][y] += 1;
            }
        }
        else if (point.y1 === point.y2) {
            let x1, x2;
            if (point.x1 <= point.x2) {
                x1 = point.x1;
                x2 = point.x2;
            }
            else {
                x2 = point.x1;
                x1 = point.x2;
            }

            for (let x = x1; x <= x2; ++x) {
                field[x][point.y1] += 1;
            }
        }
        else {
            const minusx = point.x1 > point.x2;
            const minusy = point.y1 > point.y2;

            let x = point.x1;
            let y = point.y1;

            const iter = Math.abs(point.x1 - point.x2);
            for (let i = 0; i <= iter; ++i) {
                const newX = minusx ? x - i : x + i;
                const newY = minusy ? y - i : y + i;

                field[newX][newY] += 1;
            }
        }
    }

    return field;
}

const input = readAllLines('./data/day-5/day-5.txt');
const points = input.map(line => {
    const lineArray = line.split(/->/);

    const one = lineArray[0].split(/,/).map(x => parseInt(x, 10));
    const two = lineArray[1].split(/,/).map(x => parseInt(x, 10));

    return {
        x1: one[0],
        y1: one[1],
        x2: two[0],
        y2: two[1]
    }
})

const field = initField(points);
//console.table(field);
let total = 0;
for (const row of field) {
    for (const c of row) {
        if (c > 1) {
            ++total;
        }
    }
}

console.log(total);

//console.log(field.map(row => row.reduce((a, b) => a + (b > 1 ? 1 : 0))));
