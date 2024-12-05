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

let incorrectUpdates = updates.map(update => {
    for (let i = 0; i < rules.length; i++)
        if (update.includes(rules[i][0]) && update.includes(rules[i][1]) && update.indexOf(rules[i][0]) > update.indexOf(rules[i][1])) return true;
    return false;
});

incorrectUpdates.forEach((update, i) => {
    if (!update) return;

    // this is such a janky solution omg
    // basically it rechecks the ruleset until no rules were broken, and that's when it knows it's good
    // (since switching the order of two elements can break a different rule)
    let ruleBroken = false;
    do {
        let ruleBrokenInIteration = false;
        for (let j = 0; j < rules.length; j++) {
            if (updates[i].includes(rules[j][0]) && updates[i].includes(rules[j][1]) && updates[i].indexOf(rules[j][0]) > updates[i].indexOf(rules[j][1])) {
                ruleBroken = ruleBrokenInIteration = true;
                let temp = [ updates[i][updates[i].indexOf(rules[j][0])], updates[i][updates[i].indexOf(rules[j][1])] ];
                updates[i][updates[i].indexOf(rules[j][0])] = temp[1];
                updates[i][updates[i].indexOf(rules[j][1])] = temp[0];
            }
        }
        if (!ruleBrokenInIteration) ruleBroken = false;
    } while (ruleBroken);
});

let book = [];
incorrectUpdates.forEach((update, i) => { if (update) book.push(updates[i][Math.floor(updates[i].length / 2)]); });

console.log(book.reduce((a, b) => a + b));