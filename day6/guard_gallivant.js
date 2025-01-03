const fs = require("fs");
const DEBUG_ENABLED = false;

function debug(someObj) {
  if (DEBUG_ENABLED) console.log(someObj);
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
  const rows = data.split("\n");

  const grid = [];

  for (let i = 0; i < rows.length; i++) {
    grid[i] = rows[i].split("");
  }
  return grid;
}

const data = fs.readFileSync("input.ip", "utf-8");

let grid = getGrid(data);

const DIR = {
  UP: [-1, 0],
  DOWN: [1, 0],
  RIGHT: [0, 1],
  LEFT: [0, -1],
};

function makeKey(position) {
  return `${position[0]}_${position[1]}`;
}

function _getValueFromPosition(grid, position) {
  const [row, col] = position;
  if (row > grid.length - 1 || row < 0 || col > grid[0].length || col < 0) {
    return -1;
  }
  return grid[row][col];
}

function getRobotDirection(directionSymbol) {
  if (directionSymbol === ">") return DIR.RIGHT;
  if (directionSymbol === "<") return DIR.LEFT;
  if (directionSymbol === "^") return DIR.UP;
  if (directionSymbol === "v") return DIR.DOWN;
}

function findRightDirection(direction) {
  if (direction == DIR.UP) {
    return DIR.RIGHT;
  } else if (direction == DIR.DOWN) {
    return DIR.LEFT;
  } else if (direction === DIR.RIGHT) {
    return DIR.DOWN;
  } else if (direction === DIR.LEFT) {
    return DIR.UP;
  }
}

function swapPositions(grid, oldPos, newPos) {
  const [nRow, nCol] = newPos;
  const [oRow, oCol] = oldPos;
  let temp = grid[nRow][nCol];
  debug({ temp, c: grid[oRow][oCol] });
  grid[nRow][nCol] = grid[oRow][oCol];
  grid[oRow][oCol] = temp;
  return grid;
}

function moveRobot(currentPosition, direction, steps = 1) {
  return [currentPosition[0] + direction[0], currentPosition[1] + direction[1]];
}

function checkWinConditions(positionToMove) {
  return _getValueFromPosition(grid, positionToMove) === -1;
}

function findInitialPosition(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "^") return [i, j];
    }
  }
}

robot_position = findInitialPosition(grid);
debug({ robot_position });

robot_direction = getRobotDirection(
  _getValueFromPosition(grid, robot_position)
);

let i = 0;
const visited = new Set();
visited.add(makeKey(robot_position));
while (true) {
  pG(grid);
  i++;
  const new_position = moveRobot(robot_position, robot_direction);
  debug({ new_position, robot_position });
  const value = _getValueFromPosition(grid, new_position);
  if (checkWinConditions(new_position)) {
    debug("YAAY WON");
    break;
  } else if (value == "#") {
    robot_direction = findRightDirection(robot_direction);
    debug({ robot_direction });
  } else {
    grid = swapPositions(grid, robot_position, new_position);
    robot_position = new_position;
    visited.add(makeKey(robot_position));
  }
  debug({ robot_position, value });
}

console.log(visited.size);
