// https://adventofcode.com/2023/day/1
// imaperson1060

const fs = require("fs");

const testInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;
const input = fs.readFileSync("./input.txt", "utf-8"); // https://adventofcode.com/2023/day/1/input
treb7uchet`.split(/\r?\n/g);
const input = fs.readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

const total = input.reduce((acc, line) => {
    line = line.replace(/[^\d]/gi, "");
    return acc + +(line[0] + line[line.length - 1]);
}, 0);

console.log(total);