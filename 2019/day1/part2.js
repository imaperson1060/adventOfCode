// https://adventofcode.com/2019/day/1
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g).map(n => [ +n ]);

let done = false;
let total = [];
while (!done) {
    let changes = false;
    total = (total.length ? total : input).map(fuel => {
        let newFuel = Math.floor(fuel.at(-1) / 3) - 2;
        if (newFuel <= 0) return fuel;
        changes = true;
        if (total.length) fuel.push(newFuel);
        else fuel = [ newFuel ];
        return fuel;
    });
    if (!changes) done = true;
}
console.log(total)
console.log(total.reduce((a, b) => [ a.reduce((a, b) => a + b) + b.reduce((a, b) => a + b) ])[0]);