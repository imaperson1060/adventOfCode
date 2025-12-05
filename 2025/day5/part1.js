// https://adventofcode.com/2025/day/5
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let ranges = [];
for (let line of input) {
    if (!line) break;
    ranges.push(line.split("-").map(Number));
}
let freshCount = 0;
for (let i = ranges.length + 1; i < input.length; i++) {
    let num = +input[i],
        fresh = false;
    for (let range of ranges)
        if (num >= range[0] && num <= range[1]) fresh = true;
    if (fresh) freshCount++;
}

console.log(freshCount);