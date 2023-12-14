// https://adventofcode.com/2023/day/14
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let map = input.filter(line => line).map(line => line.split(""));
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] == "O" && i) {
            for (let k = 0; k <= i; k++) {
                if (k < i && map[i - 1 - k][j] == ".") continue;
                map[i][j] = ".";
                map[i - k][j] = "O";
                break;
            }
        }
    }
}

console.log(map
    .map((line, i) => line
        .reduce((acc, char) => acc + +(char == "O"), 0) * (map.length - i))
    .reduce((acc, val) => acc + val)
);