// https://adventofcode.com/2022/day/4
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let table = input.map(pair => {
    let nums = [ [], [] ];
    for (let i = +pair.split(",")[0].split("-")[0]; i <= +pair.split(",")[0].split("-")[1]; i++) nums[0].push(i);
    for (let i = +pair.split(",")[1].split("-")[0]; i <= +pair.split(",")[1].split("-")[1]; i++) nums[1].push(i);
    return nums;
});

let overlap = 0;
table.forEach(pair => {
    if (pair[0].reduce((acc, x) => acc + pair[1].includes(x), 0)) overlap++;
});

console.log(overlap);