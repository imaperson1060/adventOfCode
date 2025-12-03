// https://adventofcode.com/2025/day/3
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

const maxes = input.map(line => {
    let max1 = -1, max2 = -1;
    for (let i = 0; i < line.length; i++) {
        for (let j = i + 1; j < line.length; j++) {
            if (+(line[i] + line[j]) > +(max1 + max2)) {
                max1 = line[i];
                max2 = line[j];
            }
        }
    }
    return +(max1 + max2);
});

console.log(maxes.reduce((a, b) => a + b));