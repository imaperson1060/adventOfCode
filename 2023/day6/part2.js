// https://adventofcode.com/2023/day/6
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

const duration = +input[0].replaceAll(" ", "").split(":")[1];
const record = +input[1].replaceAll(" ", "").split(":")[1];
let wins = 0;

for (let i = 0; i < duration; i++) { if ((duration - i) * i > record) wins++; }

console.log(wins);