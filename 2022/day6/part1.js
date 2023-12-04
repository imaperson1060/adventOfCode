// https://adventofcode.com/2022/day/6
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8");

let last4 = input.substring(0, 4).split("");
let nextChar = 4;
while (last4.filter(num => last4.indexOf(num) != last4.lastIndexOf(num)).length)
    last4.shift() && last4.push(input[nextChar++]);

console.log(nextChar);