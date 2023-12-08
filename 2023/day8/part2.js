// https://adventofcode.com/2023/day/8
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let directions = [], map = {};
input.filter(line => line).forEach(line => {
    if (line.indexOf("=") == -1) return directions = line.split("").map(direction => direction == "L" ? 0 : 1);
    map[line.split("=")[0].trim()] = [ line.split("(")[1].split(",")[0].trim(), line.split(",")[1].split(")")[0].trim() ];
});

let keys = Object.keys(map).filter(key => key.at(-1) == "A"), steps = 0;
while (keys.some(key => typeof key != "number")) {
    steps++;
    keys = keys.map(key => {
        if (typeof key == "number") return key;
        if (map[key][directions[0]].at(-1) == "Z") return steps;
        return map[key][directions[0]];
    });
    directions.push(directions.shift());
}

// https://stackoverflow.com/a/61352020
const gcd = (a, b) => b == 0 ? a : gcd(b, a % b);
const lcm = (a, b) =>  a / gcd(a, b) * b;

console.log(keys.reduce(lcm));

// https://www.reddit.com/r/adventofcode/comments/18df7px/comment/kcgswsm (used exclusively to test the output, not to copy code)