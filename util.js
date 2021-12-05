import fs from 'fs';

const readAllLines = filePath => fs.readFileSync(filePath, 'utf8').split('\n').map(x => x.trim());

export { readAllLines };