// https://adventofcode.com/2024/day/5
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let rules = [],
    updates = [],
    store = 0;
input.forEach(line => {
    if (line == "") store = 1;
    else if (store == 0) rules.push(line.split("|").map(rule => +rule));
    else updates.push(line.split(",").map(update => +update));
});

let correctUpdates = updates.map(update => {
    for (let i = 0; i < rules.length; i++)
        if (update.includes(rules[i][0]) && update.includes(rules[i][1]) && update.indexOf(rules[i][0]) > update.indexOf(rules[i][1])) return false;
    return true;
});

let book = [];
correctUpdates.forEach((update, i) => { if (update) book.push(updates[i][Math.floor(updates[i].length / 2)]); });

console.log(book.reduce((a, b) => a + b));