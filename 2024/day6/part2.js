// https://adventofcode.com/2024/day/6
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g).map(line => line.split(""));

function traverse(obstruction) {
    let guard = [],
        dir = [ -1, 0 ],
        iterations = 0,
        exited = false;
    input.forEach((line, i) => line.forEach((char, j) => { if (char == "^") guard.push([ i, j ]); }));

    while (guard.length == 1 || !exited) {
        if (++iterations > input.length * input[0].length) return false;

        let currentPos = guard.at(-1);
        if (currentPos[0] + dir[0] < 0 || currentPos[0] + dir[0] >= input.length || currentPos[1] + dir[1] < 0 || currentPos[1] + dir[1] >= input[0].length) {
            exited = true;
            continue;
        }

        let ahead = input[currentPos[0] + dir[0]][currentPos[1] + dir[1]];
        if ((currentPos[0] + dir[0] != obstruction?.[0] || currentPos[1] + dir[1] != obstruction?.[1]) && (ahead == "." || ahead == "^")) guard.push([ currentPos[0] + dir[0], currentPos[1] + dir[1] ]);
        else if (dir[0] == -1 && dir[1] == 0) dir = [ 0, 1 ]; // turn from ^ to >
        else if (dir[0] == 0 && dir[1] == 1) dir = [ 1, 0 ]; // turn from > to v
        else if (dir[0] == 1 && dir[1] == 0) dir = [ 0, -1 ]; // turn from v to <
        else if (dir[0] == 0 && dir[1] == -1) dir = [ -1, 0 ]; // turn from < to ^
    }

    return guard;
}

let guard = traverse(),
    obstructions = 0;

guard.forEach((pos, i) => {
    for (let j = i + 1; j < guard.length; j++)
        if (guard[j][0] == pos[0] && guard[j][1] == pos[1]) guard[j] = [];
});

for (let i = 1; i < guard.length; i++)
    if (!traverse(guard[i])) obstructions++;

console.log(obstructions);