const fs = require("fs");

const data = fs.readFileSync("aoc25.ip", { encoding: "utf-8" });

const ipList = data.split("\r\n\r\n");
console.log({ ipList });

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
  console.log(str);
}

const grids = [];
ipList.forEach((data) => {
  grids.push(buildGrid(data));
  printGrid(buildGrid(data));
});
const locks = [];
const keys = [];
grids.forEach((grid) => {
  const gridLen = grid.length;
  console.log();
  const isKey = grid[0].find((data) => data !== "#");
  console.log("groovy", findGrooveValues(grid));

  if (!isKey) {
    locks.push(findGrooveValues(grid));
  } else {
    keys.push(findGrooveValues(grid));
  }
});

console.log(locks.length, keys.length);

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
    console.log(index, doesKeyFit(lock, key));
    if (doesKeyFit(lock, key)) {
      numUniqueCombos++;
    }
  });
});

console.log({ numUniqueCombos });
