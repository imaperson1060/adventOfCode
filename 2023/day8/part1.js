// https://adventofcode.com/2023/day/8
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let directions = [], map = {};
input.filter(line => line).forEach(line => {
    if (line.indexOf("=") == -1) return directions = line.split("").map(direction => direction == "L" ? 0 : 1);
    map[line.split("=")[0].trim()] = [ line.split("(")[1].split(",")[0].trim(), line.split(",")[1].split(")")[0].trim() ];
});

let current = "AAA", steps = 0;
while (current != "ZZZ") {
    current = map[current][directions[0]];
    directions.push(directions.shift());
    steps++;
}

console.log(steps);