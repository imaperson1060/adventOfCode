// https://adventofcode.com/2024/day/2
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

const reports = input.map(line => {
    line = line.split(" ").map(x => +x);
    let inc = line[0] - line[1] < 0;
    for (let i = 0; i < line.length - 1; i++) {
        let diff = line[i + 1] - line[i];
        if ((diff < 0 && inc) || (diff > 0 && !inc) || Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;
    }
    return true;
});

console.log(reports.filter(x => x).length);