// https://adventofcode.com/2023/day/1
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

const total = input.reduce((acc, line) => {
    line = line.replace(/[^\d]/gi, "");
    return acc + +(line[0] + line[line.length - 1]);
}, 0);

console.log(total);