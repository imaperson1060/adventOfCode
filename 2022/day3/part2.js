// https://adventofcode.com/2022/day/3
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let badges = [];

let group = [];
input.forEach(line => {
    if (group.length < 2) return group.push(line);

    new Set([...group[0]]).forEach(item => {
        if (group[1].indexOf(item) != -1 && line.indexOf(item) != -1) badges.push(item);
    });

    group = [];
});

badges = badges.map(item => {
    if (item == item.toUpperCase()) return item.charCodeAt() - 38;
    else return item.charCodeAt() - 96;
});

console.log(badges.reduce((acc, item) => acc + item));