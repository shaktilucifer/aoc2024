const fs = require('fs');

const raw_data = fs.readFileSync('aoc11.ip', 'utf-8');
let data = raw_data.split(' ');
const BLINKS = 6;
console.log({data});

function applyParameters(num) {
    let length = Math.floor(Math.log10(num)) + 1;
    if (num == 0) {
         return [1];
    } else if (length % 2 == 0) {
        return [Math.trunc(num/Math.pow(10, length/2)), num % Math.pow(10, length/2)];
    } else {
        return [num * 2024];
    }
}

let finalMap = new Map();


function applyBlink(dataArr) {
    let map = new Map();
    Array.from(dataArr).map((num) => {
        let [val1, val2] = applyParameters(num);
        map.set(val1, (map.get(val1) || 0) + 1); 
         if(val2 != undefined)  
            map.set(val2, (map.get(val2) || 0) + 1);   

       
    });
    return map.keys();
}

for(let i = 0; i < data.length; i++) {
    finalMap.set(+data[i], 1);
}
let d = finalMap.keys();
for(let i = 0; i < BLINKS + 1; i++) {
    console.log({d});
    d = applyBlink(d);
}
console.log([...finalMap.values()].reduce((acc, val) => acc + val, 0));
console.log({solution: d.size});

