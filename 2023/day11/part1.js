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
let progress = 0;
for (let i = 0; i < positions.length; i++) {
    console.log(((progress / Math.pow(positions.length, 2)) * 100).toFixed(2) + "% done (" + progress, "/", Math.pow(positions.length, 2) + ")");
    for (let j = 0; j < positions.length; j++) {
        progress++;
        if (i != j && !pairs.filter(pair => pair.indexOf(positions[i]) != -1 && pair.indexOf(positions[j]) != -1).length)
            pairs.push([ positions[i], positions[j] ]);
    }
}

console.log(pairs.map(pair => Math.abs(pair[0][0] - pair[1][0]) + Math.abs(pair[0][1] - pair[1][1])).reduce((acc, x) => acc + x));