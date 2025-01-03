const fs = require("fs");

const data = fs.readFileSync("input.ip", "utf-8");

const queuePrint = data.split("\n\n");

const [pageOrderStr, pageUpdateStr] = queuePrint;

const pageOrder = pageOrderStr.split("\n");
const pageUpdates = pageUpdateStr.split("\n");

const pageOrderMap = new Map();

pageOrder.forEach((pageOrder) => {
  const [key, val] = pageOrder.split("|");
  if (pageOrderMap.has(key)) {
    pageOrderMap.set(key, pageOrderMap.get(key).add(val));
  } else {
    pageOrderMap.set(key, new Set().add(val));
  }
});

const successfulUpdates = [];
const failedUpdates = [];

function findMiddleNumber(someArray) {
  if (someArray.length % 2 !== 0) {
    return someArray[parseInt(someArray.length / 2)];
  } else {
    return someArray[parseInt(someArray.length / 2) + 1];
  }
}

pageUpdates.forEach((pageUpdate, index) => {
  const pages = pageUpdate.split(",");
  let success = true;
  for (let i = 0; i < pages.length - 1; i++) {
    const key = pages[i];
    let j = i + 1;
    while (j < pages.length) {
      if (!!!pageOrderMap.get(key) || !pageOrderMap.get(key).has(pages[j])) {
        success = false;
        break;
      }
      j++;
    }
    if (!success) break;
  }
  if (success) successfulUpdates.push(findMiddleNumber(pages));
  else {
    failedUpdates.push(pages);
  }
});


// part 1
console.log({
  sum1: successfulUpdates.reduce((prev, curr) => +prev + +curr, 0),
});

function fixPages(fail) {
  return fail.sort((a, b) => {
    return pageOrderMap.get(a) && pageOrderMap.get(a).has(b)
      ? -1
      : pageOrderMap.get(b).has(a)
      ? 1
      : 0;
  });
}
let sum2 = 0;
failedUpdates.forEach((failedUpdate) => {
  const fixedPages = fixPages(failedUpdate);
  sum2 += +findMiddleNumber(fixedPages);
});

// part 2
console.log({ sum2 });
