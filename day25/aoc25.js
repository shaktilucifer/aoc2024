const fs = require("fs");

const data = fs.readFileSync("aoc25.ip", { encoding: "utf-8" });

const ipList = data.split("\r\n\r\n");

function buildGrid(gridStr) {
  let grid = gridStr.split("\r\n");
  return grid.map((data) => data.split(""));
}

function printGrid(grid) {
  let str = "";
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      str = str + grid[i][j];
    }
    str += "\n";
  }
}

const grids = [];
ipList.forEach((data) => {
  grids.push(buildGrid(data));
  printGrid(buildGrid(data));
});
const locks = [];
const keys = [];
grids.forEach((grid) => {
  const isKey = grid[0].find((data) => data !== "#");

  if (!isKey) {
    locks.push(findGrooveValues(grid));
  } else {
    keys.push(findGrooveValues(grid));
  }
});


function findGrooveValues(grid) {
  const arr = [];
  for (let i = 0; i < grid[0].length; i++) {
    let count = 0;
    for (let j = 0; j < grid.length; j++) {
      if (grid[j][i] === "#") {
        count++;
      }
    }
    arr.push(count - 1);
  }
  return arr;
}

function doesKeyFit(lock, key) {
  for (i = 0; i < lock.length; i++) {
    if (lock[i] + key[i] > 5) {
      return false;
    }
  }
  return true;
}

let numUniqueCombos = 0;
locks.forEach((lock) => {
  keys.forEach((key, index) => {
    if (doesKeyFit(lock, key)) {
      numUniqueCombos++;
    }
  });
});

console.log({ numUniqueCombos });
