const fs = require("fs");

const data = fs.readFileSync("aoc9.ip", "utf-8");

function getCheckSum(memory) {
  return memory
    .filter((i) => i != ".")
    .reduce((acc, a, index) => a * index + acc, 0);
}

let spaceNeeded = 0;
const totalMemory = [];
let value = 0;
for (let i = 0; i < data.length; i++) {
  let ch = data.charAt(i);
  let num = ch - "0";
  let isEven = i % 2 === 0;
  let j = 0;
  while (j < num) {
    if (isEven) {
      totalMemory.push(value);
    } else {
      totalMemory.push(".");
    }
    j++;
  }
  if (isEven) value++;

  spaceNeeded += num;
}

let pt1 = 0;

for (let i = totalMemory.length - 1; i >= 0; i--) {
  let curr = totalMemory[i];
  if (pt1 >= i) break;
  if (curr != ".") {
    while (totalMemory[pt1] != ".") {
      pt1++;
    }
    totalMemory[pt1++] = totalMemory[i];
    totalMemory[i] = ".";
  }
}

// console.log({totalMemory});
// console.log({spaceNeeded, sp: totalMemory.join(' ')});

console.log({ ans: getCheckSum(totalMemory) });
