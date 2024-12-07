const fs = require("fs");

// print grid
function pG(grid) {
    let str = "";
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        str += grid[i][j];
      }
      str += "\n";
    }
    console.log(str);
  }

function getGrid(data) {
  let grid = [];
  for (let i = 0; i < data.length - 1; i++) {
    grid[i] = data[i].split("");
  }
  return grid;
}

const data = fs.readFileSync("input.ip", "utf-8");

const rows = data.split("\n");

const grid = getGrid(rows);

// console.log({grid});
pG(grid);
