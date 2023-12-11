// https://adventofcode.com/2023/day/11
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let adjustedMap = input;
for (let i = 0; i < adjustedMap.length; i++) { if (adjustedMap[i].indexOf("#") == -1) adjustedMap.splice(i, 0, adjustedMap[i++]); }
for (let i = 0; i < adjustedMap[0].length; i++) {
    if (!adjustedMap.reduce((acc, cur) => acc || cur[i] == "#", false)) {
        for (let j = 0; j < adjustedMap.length; j++) adjustedMap[j] = adjustedMap[j].slice(0, i) + "." + adjustedMap[j].slice(i);
        i++;
    }
}

let positions = [];
for (let i = 0; i < adjustedMap.length; i++) { for (let j = 0; j < adjustedMap[i].length; j++) { if (adjustedMap[i][j] == "#") positions.push([i, j]); } }
let pairs = [];
for (let i = 0; i < positions.length; i++) { for (let j = 0; j < positions.length; j++) { if (i != j) pairs.push([ positions[i], positions[j] ]); } }

console.log(pairs.map(pair => Math.abs(pair[0][0] - pair[1][0]) + Math.abs(pair[0][1] - pair[1][1])).reduce((acc, x) => acc + x) / 2);