// https://adventofcode.com/2023/day/2
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let sum = 0;

input.forEach((line, i) => {
    const game = line.split(": ")[1].split("; ").map(round => round.split(", ").map(cube => ({ color: cube.substring(cube.indexOf(" ") + 1), amount: +cube.substring(0, cube.indexOf(" ")) })));
    let min = { red: 0, green: 0, blue: 0 };
    game.forEach(round => {
        round.forEach(cube => {
            if (cube.amount > min[cube.color]) min[cube.color] = cube.amount;
        });
    });
    sum += min.red * min.green * min.blue;
});

console.log(sum);