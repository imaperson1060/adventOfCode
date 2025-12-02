// https://adventofcode.com/2025/day/2
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(",");

const ranges = input.map(range => range = range.split("-").map(Number));

let total = 0;
ranges.forEach(range => {
    const [start, end] = range;
    for (let i = start; i <= end; i++) {
        let str = i.toString();
        if (str.slice(0, Math.floor(str.length / 2)) == str.slice(Math.floor(str.length / 2))) total += i;
    }
});
console.log(total);