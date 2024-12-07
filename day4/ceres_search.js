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

function getGrid(data) {
  let grid = [];
  for (let i = 0; i < data.length - 1; i++) {
    grid[i] = data[i].split("");
  }
  return grid;
}

function getXPositions(grid, character) {
  let positions = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === character) {
        positions.push([i, j]);
      }
    }
  }

  return positions;
}

const data = fs.readFileSync("input.ip", "utf-8");

const rows = data.split("\n");

const grid = getGrid(rows);

xPositions = getXPositions(grid, "X");
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
// part 1
console.log({ finalPositions: finalPositions.filter((i) => i.length).length });

// part 2

function check2(grid, position) {
  const upLeft = _getValueFromPosition(
    grid,
    movePosition(position, DIR.UP_LEFT)
  );
  const upRight = _getValueFromPosition(
    grid,
    movePosition(position, DIR.UP_RIGHT)
  );
  const downLeft = _getValueFromPosition(
    grid,
    movePosition(position, DIR.DOWN_LEFT)
  );
  const downRight = _getValueFromPosition(
    grid,
    movePosition(position, DIR.DOWN_RIGHT)
  );

  return (
    (downLeft == "M" && downRight == "M" && upRight == "S" && upLeft == "S") ||
    (downLeft == "S" && downRight == "S" && upRight == "M" && upLeft == "M") ||
    (downLeft == "S" && downRight == "M" && upRight == "M" && upLeft == "S") ||
    (downLeft == "M" && downRight == "S" && upRight == "S" && upLeft == "M")
  );
}

const aPositions = getXPositions(grid, "A");

let count = 0;
for (let i = 0; i < aPositions.length; i++) {
  if (check2(grid, aPositions[i])) {
    count = count + 1;
  }
}

console.log({ count });
