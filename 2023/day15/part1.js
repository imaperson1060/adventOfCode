// https://adventofcode.com/2023/day/15
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(",");

let total = 0;
input.forEach(x => {
    let value = 0;
    for (let i = 0; i < x.length; i++) {
        value += x.charCodeAt(i);
        value *= 17;
        value = value % 256;
    }
    total += value;
});

console.log(total);