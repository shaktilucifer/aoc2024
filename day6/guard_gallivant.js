const fs = require("fs");

const data = fs.readFileSync("input.ip", "utf-8");

console.log(data);

const rows = data.split('\n');
console.log({rows, len: rows.length});

const grid = [];

for(let i = 0; i < rows.length; i++) {
    grid[i] = rows[i].split('');
}
// test grid works
console.log({grid, wh: grid[rows.length - 1][grid[0].length - 1 - 3]});
console.log({robot: grid[6][4]});