// https://adventofcode.com/2025/day/1
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let val = 50, password = 0;
input.forEach(line => {
    // let dir = line[0] == "L" ? -1 : 1;
    // let numToAdd = dir * +line.slice(1);
    // val += numToAdd;
    // if ((val - numToAdd > 0 && val <= 0) || val > 99) password++;
    // while (val > 99) val -= 100;
    // while (val < 0) val += 100;
    // idk why this didn't work 😭 (at least the below code runs quickly, i thought it was too brute force-y)

    let dir = line[0] == "L" ? -1 : 1;
    let numToAdd = +line.slice(1);
    for (let i = 0; i < numToAdd; i++) {
        val += dir;
        if (val == -1) val = 99;
        if (val == 100) val = 0;
        if (val == 0) password++;
    }
});

console.log(password);