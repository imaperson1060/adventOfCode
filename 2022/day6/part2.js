// https://adventofcode.com/2022/day/6
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8");

let last14 = input.substring(0, 14).split("");
let nextChar = 14;
while (last14.filter(num => last14.indexOf(num) != last14.lastIndexOf(num)).length)
    last14.shift() && last14.push(input[nextChar++]);

console.log(nextChar);