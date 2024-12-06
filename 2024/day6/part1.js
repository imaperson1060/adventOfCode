// https://adventofcode.com/2024/day/6
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g).map(line => line.split(""));

let guard = [],
    dir = [ -1, 0 ],
    exited = false;
input.forEach((line, i) => line.forEach((char, j) => { if (char == "^") guard.push([ i, j ]); }));
input[guard[0][0]][guard[0][1]] = ".";

while (guard.length == 1 || !exited) {
    let currentPos = guard.at(-1);
    if (currentPos[0] + dir[0] < 0 || currentPos[0] + dir[0] >= input.length || currentPos[1] + dir[1] < 0 || currentPos[1] + dir[1] >= input[0].length) {
        exited = true;
        continue;
    }

    let ahead = input[currentPos[0] + dir[0]][currentPos[1] + dir[1]];
    if (ahead == ".") guard.push([ currentPos[0] + dir[0], currentPos[1] + dir[1] ]);
    else if (dir[0] == -1 && dir[1] == 0) dir = [ 0, 1 ]; // turn from ^ to >
    else if (dir[0] == 0 && dir[1] == 1) dir = [ 1, 0 ]; // turn from > to v
    else if (dir[0] == 1 && dir[1] == 0) dir = [ 0, -1 ]; // turn from v to <
    else if (dir[0] == 0 && dir[1] == -1) dir = [ -1, 0 ]; // turn from < to ^

    if (guard.at(-1)[0] == guard[0][0] && guard.at(-1)[1] == guard[0][1] && dir[0] == -1 && dir[1] == 0) exited = true;
}

guard.forEach((pos, i) => {
    for (let j = i + 1; j < guard.length; j++)
        if (guard[j][0] == pos[0] && guard[j][1] == pos[1]) guard[j] = [];
});

console.log(guard.filter(pos => pos.length).length);