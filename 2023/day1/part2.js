// https://adventofcode.com/2023/day/1
// imaperson1060

const fs = require("fs");

const testInput = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`.split(/\r?\n/g);
const input = fs.readFileSync("./input.txt", "utf-8").split(/\r?\n/g);
const validNums = [ "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" ];

const total = input.reduce((acc, line) => {
    let num1, num2;

    for (let i = 0; i < line.length; i++) {
        if (!num1 && parseInt(line[i])) num1 = +line[i];
        validNums.forEach(num => {
            if (!num1 && line.indexOf(num) == i) num1 = validNums.indexOf(num) + 1;
        });
    }
    for (let i = line.length; i >= 0; i--) {
        if (!num2 && parseInt(line[i])) num2 = +line[i];
        validNums.forEach(num => {
            if (!num2 && line.indexOf(num, i) == i) num2 = validNums.indexOf(num) + 1;
        });
    }

    return acc + (num1 * 10) + num2;
}, 0);

console.log(total);