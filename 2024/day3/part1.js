// https://adventofcode.com/2024/day/3
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8");

let instructions = input.match(/(mul\((\d+),(\d+)\))/g),
    total = 0;

instructions.forEach(x => total += x.match(/(\d+)/g).map(x => +x).reduce((a, b) => a * b));

console.log(total);