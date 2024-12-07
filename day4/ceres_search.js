const fs = require("fs");
const XWORD = "XMAS";
const DIR = {
  UP: [-1, 0],
  UP_RIGHT: [-1, 1],
  UP_LEFT: [-1, -1],
  DOWN: [1, 0],
  DOWN_RIGHT: [1, 1],
  DOWN_LEFT: [1, -1],
  RIGHT: [0, 1],
  LEFT: [0, -1],
};

function movePosition(currentPosition, direction) {
  return [currentPosition[0] + direction[0], currentPosition[1] + direction[1]];
}

function _getValueFromPosition(grid, position) {
  const [row, col] = position;
  if (row > grid.length - 1 || row < 0 || col > grid[0].length || col < 0) {
    return -1;
  }
  return grid[row][col];
}

function makeKey(position) {
    return `${position[0]}_${position[1]}`;
  }

function check(grid, position, direction) {
  let i = 1;
  let wordPositionList = [makeKey(position)];
  while (i < XWORD.length) {
    const new_pos = movePosition(position, direction);
    // console.log({t: XWORD.charAt(i), me: _getValueFromPosition(grid, new_pos), new_pos})
    if (XWORD.charAt(i) === _getValueFromPosition(grid, new_pos)) {
      wordPositionList.push(makeKey(new_pos));
      position = new_pos;
    } else {
        return [];
    }
    i++;
  }
  return wordPositionList;
}

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

function getXPositions(grid) {
  let positions = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "X") {
        positions.push([i, j]);
      }
    }
  }

  return positions;
}

const data = fs.readFileSync("input.ip", "utf-8");

const rows = data.split("\n");

const grid = getGrid(rows);

xPositions = getXPositions(grid);
console.log({xPositions: xPositions.length})
const finalPositions = [];

for (let i = 0; i < xPositions.length; i++) {
  finalPositions.push(check(grid, xPositions[i], DIR.RIGHT));
  finalPositions.push(check(grid, xPositions[i], DIR.LEFT));
  finalPositions.push(check(grid, xPositions[i], DIR.UP));
  finalPositions.push(check(grid, xPositions[i], DIR.DOWN));
  finalPositions.push(check(grid, xPositions[i], DIR.DOWN_LEFT));
  finalPositions.push(check(grid, xPositions[i], DIR.DOWN_RIGHT));
  finalPositions.push(check(grid, xPositions[i], DIR.UP_RIGHT));
  finalPositions.push(check(grid, xPositions[i], DIR.UP_LEFT));
}

console.log({finalPositions: finalPositions.filter(i => i.length).length});