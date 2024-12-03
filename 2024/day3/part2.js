// https://adventofcode.com/2024/day/3
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8");

let instructions = input.match(/(mul\((\d+),(\d+)\)|do\(\)|don't\(\))/g),
    mul = true,
    total = 0;

instructions.forEach(x => {
    if (x.includes("mul") && mul) total += x.match(/(\d+)/g).map(x => +x).reduce((a, b) => a * b);
    else if (x.includes("don't")) mul = false;
    else if (x.includes("do")) mul = true;
});

console.log(total);