// https://adventofcode.com/2024/day/25
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n\r?\n/g).map(x => x.split(/\r?\n/g).map(x => x.split("")));

let locks = [], keys = [];
input.forEach(x => {
    let cols = new Array(x[0].length).fill(-1);
    for (let i = 0; i < x.length; i++)
        for (let j = 0; j < x[0].length; j++)
            if (x[i][j] == "#") cols[j]++;

    if (x[0].indexOf("#") == -1) keys.push(cols);
    else locks.push(cols);
});

let matches = 0;
locks.forEach(lock => {
    keys.forEach(key => {
        for (let i = 0; i < lock.length; i++)
            if (lock[i] + key[i] > 5) return;
        matches++;
    });
});

console.log(matches);