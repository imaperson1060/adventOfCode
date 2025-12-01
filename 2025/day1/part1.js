// https://adventofcode.com/2025/day/1
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let val = 50, password = 0;
input.forEach(line => {
    let dir = line[0] == "L" ? -1 : 1;
    val += dir * +line.slice(1);
    while (val > 99) val -= 100;
    while (val < 0) val += 100;
    if (val == 0) password++;
});

console.log(password);