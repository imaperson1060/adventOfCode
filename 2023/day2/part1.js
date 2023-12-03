// https://adventofcode.com/2023/day/2
// imaperson1060

const fs = require("fs");

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`.split(/\r?\n/g);
const input = fs.readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

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