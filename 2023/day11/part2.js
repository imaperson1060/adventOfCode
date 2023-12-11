// https://adventofcode.com/2023/day/11
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let adjustedMap = input;
for (let i = 0; i < adjustedMap.length; i++) { if (adjustedMap[i].indexOf("#") == -1) adjustedMap.splice(++i, 0, new Array(adjustedMap[i].length).fill("$").join("")); }
for (let i = 0; i < adjustedMap[0].length; i++) {
    if (!adjustedMap.reduce((acc, cur) => acc || cur[i] == "#", false)) {
        for (let j = 0; j < adjustedMap.length; j++) adjustedMap[j] = adjustedMap[j].slice(0, i + 1) + "$" + adjustedMap[j].slice(i + 1);
        i++;
    }
}

let positions = [];
for (let i = 0; i < adjustedMap.length; i++) { for (let j = 0; j < adjustedMap[i].length; j++) { if (adjustedMap[i][j] == "#") positions.push([i, j]); } }
let pairs = [];
for (let i = 0; i < positions.length; i++) { for (let j = 0; j < positions.length; j++) { if (i != j) pairs.push([ positions[i], positions[j] ]); } }

console.log(pairs.map(pair => {
    let [ y1, x1 ] = pair[0], [ y2, x2 ] = pair[1];
    let deltaY = 0, deltaX = 0, delta = 999999;

    while (y1 < y2) {
        if (adjustedMap[y1][x1] == "$") deltaY += delta;
        else deltaY++;
        y1++;
    }
    while (y1 > y2) {
        if (adjustedMap[y1][x1] == "$") deltaY += delta;
        else deltaY++;
        y1--;
    }

    while (x1 < x2) {
        if (adjustedMap[y1][x1] == "$") deltaX += delta;
        else deltaX++;
        x1++;
    }
    while (x1 > x2) {
        if (adjustedMap[y1][x1] == "$") deltaX += delta;
        else deltaX++;
        x1--;
    }

    return deltaX + deltaY;
}).reduce((acc, x) => acc + x) / 2);