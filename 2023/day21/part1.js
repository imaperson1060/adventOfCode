// https://adventofcode.com/2023/day/21
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

function findStart() {
    let x, y;
    x = input.reduce((acc, line, i) => acc += line.includes("S") ? i : 0, 0);
    y = input[x].indexOf("S");
    return [ y, x ];
}

let steps = 64, locs = [ findStart() ];
for (let i = 0; i < steps; i++) {
    let current = [...locs];
    locs = [];
    for (let [ y, x ] of current) {
        if (y < input.length - 1) locs.push([ y + 1, x ]);
        if (y > 0) locs.push([ y - 1, x ]);
        if (x < input[0].length) locs.push([ y, x + 1 ]);
        if (x > 0) locs.push([ y, x - 1 ]);
    }
    locs = Array.from(new Set(locs.map(JSON.stringify)), JSON.parse); // https://stackoverflow.com/a/66849069
    locs = locs.filter(loc => input[loc[0]][loc[1]] != "#");
}

console.log(locs.length);