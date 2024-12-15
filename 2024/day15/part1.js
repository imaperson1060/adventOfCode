// https://adventofcode.com/2024/day/15
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let DIRECTIONS = { "^": [ -1, 0 ], "v": [ 1, 0 ], "<": [ 0, -1 ], ">": [ 0, 1 ] },
    map = [], directions = [], instructions = false, pos;

input.forEach(line => {
    if (line == "") return instructions = true;
    if (instructions) return directions = [ ...directions, ...line.split("").map(direction => DIRECTIONS[direction]) ];
    map.push(line.split(""));
    if (line.indexOf("@") != -1) pos = [ map.length - 1, line.indexOf("@") ];
});

directions.forEach((direction, i) => {
    let next = [ pos[0] + direction[0], pos[1] + direction[1] ];
    if (map[next[0]][next[1]] == ".") {
        map[pos[0]][pos[1]] = ".";
        map[next[0]][next[1]] = "@";
        pos = next;
    } else if (map[next[0]][next[1]] == "O") {
        let spaces = 1;
        while (map[next[0] + direction[0] * spaces][next[1] + direction[1] * spaces] == "O") spaces++;
        if (map[next[0] + direction[0] * spaces][next[1] + direction[1] * spaces] == "#") return;
        map[pos[0]][pos[1]] = ".";
        map[next[0]][next[1]] = "@";
        map[ next[0] + direction[0] * spaces][next[1] + direction[1] * spaces ] = "O";
        pos = next;
    }
});

let gps = 0;
map.forEach((line, i) => line.forEach((char, j) => gps += char == "O" ? 100 * i + j : 0));

console.log(gps);