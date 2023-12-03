// https://adventofcode.com/2022/day/2
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);
const key = { A: 1, B: 2, C: 3, X: 0, Y: 3, Z: 6 };
const rps = (you, opponent) => {
    if (you == 3) return opponent;
    else if (you == 0) return [ 1, 2, 3 ].at(opponent - 2);
    else return [ 3, 1, 2 ].at(opponent - 2);
}

let score = 0;

input.forEach(line => {
    const opponent = line.split(" ")[0];
    const you = line.split(" ")[1];

    score += rps(key[you], key[opponent]) + key[you];
});

console.log(score);