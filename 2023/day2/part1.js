// https://adventofcode.com/2023/day/2
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let impossible = [];

input.forEach((line, i) => {
    const game = line.split(": ")[1].split("; ").map(round => round.split(", ").map(cube => ({ color: cube.substring(cube.indexOf(" ") + 1), amount: +cube.substring(0, cube.indexOf(" ")) })));
    game.forEach(round => {
        round.forEach(cube => {
            if (impossible.indexOf(i + 1) == -1 &&
                ((cube.color == "red" && cube.amount > 12) ||
                (cube.color == "green" && cube.amount > 13) ||
                (cube.color == "blue" && cube.amount > 14))) impossible.push(i + 1);
        });
    });
});

console.log(impossible.reduce((acc, x) => acc -= x, (input.length * (input.length + 1)) / 2));