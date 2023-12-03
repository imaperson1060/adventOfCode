// https://adventofcode.com/2022/day/1
// imaperson1060

const fs = require("fs");

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let elves = [ 0 ];
input.forEach(line => {
    if (!line.length) elves.push(0);
    else elves[elves.length - 1] += +line;
});

console.log(elves.reduce((acc, elf) => Math.max(acc, elf)));