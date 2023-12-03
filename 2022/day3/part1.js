// https://adventofcode.com/2022/day/3
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let overlap = [];

input.forEach(line => {
    const compartment1 = [...new Set([...line.substring(0, line.length / 2)])];
    const compartment2 = [...new Set([...line.substring(line.length / 2)])];

    compartment2.forEach(item => {
        if (compartment1.indexOf(item) != -1) overlap.push(item);
    });
});

overlap = overlap.map(item => {
    if (item == item.toUpperCase()) return item.charCodeAt() - 38;
    else return item.charCodeAt() - 96;
});

console.log(overlap.reduce((acc, item) => acc + item));