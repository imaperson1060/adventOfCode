// https://adventofcode.com/2024/day/1
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let list1 = input.map(x => +x.split(" ")[0]).sort(),
    list2 = input.map(x => +x.split(" ").at(-1)).sort();

let total = 0;
for (let i = 0; i < list1.length; i++) total += Math.abs(list1[i] - list2[i]);

console.log(total);