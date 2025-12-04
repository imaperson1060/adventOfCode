// https://adventofcode.com/2025/day/4
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

const directions = [ [ -1, -1, ], [ -1, 0, ], [ -1, 1, ],
                     [ 0, -1, ], [ 0, 1, ],
                     [ 1, -1, ], [ 1, 0, ], [ 1, 1, ] ];

let total = 0;
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] != "@") continue;

        let count = 0;
        for (let [ x, y ] of directions) {
            let newX = i + x, newY = j + y;
            if (newX < 0 || newY < 0 || newX >= input.length || newY >= input[i].length) continue;
            if (input[newX][newY] == "@") count++;
        }
        if (count < 4) total++;
    }
}
console.log(total);