// https://adventofcode.com/2019/day/1
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g).map(n => +n);

console.log(input.map(line => Math.floor(line / 3) - 2).reduce((a, b) => a + b));