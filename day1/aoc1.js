const fs = require("fs");
const ROW_SPLIT = "   ";
const FILE_SPLIT = "\r\n";
const leftCol = [];
const rightCol = [];
let sum = 0;
function buildDistinctCountMap(listy) {
  const mapToReturn = new Map();
  for (let i = 0; i < listy.length; i++) {
    if (mapToReturn.has(listy[i])) {
        test =  mapToReturn.get(listy[i]) + 1;
      mapToReturn.set(listy[i],mapToReturn.get(listy[i]) + 1);
    } else {
      mapToReturn.set(listy[i], 1);
    }
  }

  return mapToReturn;
}

fs.readFile("aoc1_ip", "utf-8", (err, data) => {
    let similarityScore = 0;

  if (err) console.log(err);
  const rows = data.split(FILE_SPLIT);
  for (let i = 0; i < rows.length; i++) {
    const [a, b] = rows[i].split(ROW_SPLIT);
    leftCol.push(a);
    rightCol.push(b);
  }
  const distinctMap = buildDistinctCountMap(rightCol);

  leftCol.sort();
  rightCol.sort();
  for (let i = 0; i < rows.length; i++) {
    // sum += Math.abs(leftCol[i] - rightCol[i]);
    const numPresent = distinctMap.get(leftCol[i]);
    if (numPresent) {
        similarityScore += (leftCol[i] * numPresent)
    }
  }
  //   console.log({sum});
  console.log({similarityScore});
});
