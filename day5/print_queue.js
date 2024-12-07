const fs = require('fs');

const data = fs.readFileSync('input.ip', 'utf-8');

const queuePrint = data.split('\n\n');

const [pageOrderStr, pageUpdateStr] = queuePrint;

const pageOrder = pageOrderStr.split('\n');
const pageUpdates = pageUpdateStr.split('\n');

console.log({pageOrder, pageUpdates});
