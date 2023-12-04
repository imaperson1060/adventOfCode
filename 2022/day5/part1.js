// https://adventofcode.com/2022/day/5
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let stacks = [];
input.forEach((line, layer) => {
    for (let i = 0; i < line.length; i++) {
        if (line[i] == "[") {
            if (!stacks[i / 4]) stacks[i / 4] = [];
            stacks[i / 4].push(line[i + 1]);
        }
    }
    if (line.startsWith("move")) {
        let [ amount, from, to ] = [ +line.split(" ")[1], +line.split(" ")[3], +line.split(" ")[5] ];
        if (amount > stacks[from - 1].length) amount = stacks[from - 1].length;
        for (let i = 0; i < amount; i++) stacks[to - 1].unshift(stacks[from - 1].shift());
    }
});

console.log(stacks.reduce((acc, box) => acc + box[0], ""));