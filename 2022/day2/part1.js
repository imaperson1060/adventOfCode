// https://adventofcode.com/2022/day/2
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);
const key = { A: 1, B: 2, C: 3, X: 1, Y: 2, Z: 3 };
const rps = (you, opponent) => {
    if (you == opponent) return 3;
    else if (you == [ 1, 2, 3 ].at(opponent - 2)) return 0;
    else return 6;
}

let score = 0;

input.forEach(line => {
    const opponent = line.split(" ")[0];
    const you = line.split(" ")[1];

    score += key[you] + rps(key[you], key[opponent]);
});

console.log(score);