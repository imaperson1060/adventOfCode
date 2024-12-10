// https://adventofcode.com/2024/day/10
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g).map(x => x.split("").map(x => +x));

let zeros = [];
for (let i = 0; i < input.length; i++)
    for (let j = 0; j < input[i].length; j++)
        if (input[i][j] == 0) zeros.push([i, j]);

function findNext(pos) {
    let current = input[pos[0]][pos[1]],
        next = [];

    if (input[pos[0] + 1]?.[pos[1]] == current + 1) next.push([pos[0] + 1, pos[1]]);
    if (input[pos[0] - 1]?.[pos[1]] == current + 1) next.push([pos[0] - 1, pos[1]]);
    if (input[pos[0]][pos[1] + 1] == current + 1) next.push([pos[0], pos[1] + 1]);
    if (input[pos[0]][pos[1] - 1] == current + 1) next.push([pos[0], pos[1] - 1]);

    return next;
}

let trailheads = 0;
zeros.forEach(pos => {
    let next = [ pos ];
    while (next.length) {
        let found = [];
        next.forEach(pos => {
            if (input[pos[0]][pos[1]] == 9) trailheads++;
            else found.push(...findNext(pos));
        });
        next = found.filter(x => x.length);
    }
});

console.log(trailheads);