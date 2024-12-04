// https://adventofcode.com/2024/day/4
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g).map(x => x.split(""));

let xmas = 0;

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] === "X") {
            if (input[i][j - 1] == "M" && input[i][j - 2] == "A" && input[i][j - 3] == "S") xmas++; // SAMX
            if (input[i][j + 1] == "M" && input[i][j + 2] == "A" && input[i][j + 3] == "S") xmas++; // XMAS
            if (input[i - 1]?.[j] == "M" && input[i - 2]?.[j] == "A" && input[i - 3]?.[j] == "S") xmas++; // SAMX (vertical)
            if (input[i + 1]?.[j] == "M" && input[i + 2]?.[j] == "A" && input[i + 3]?.[j] == "S") xmas++; // XMAS (vertical)
            if (input[i - 1]?.[j - 1] == "M" && input[i - 2]?.[j - 2] == "A" && input[i - 3]?.[j - 3] == "S") xmas++; // SAMX (diagonal, up-left)
            if (input[i - 1]?.[j + 1] == "M" && input[i - 2]?.[j + 2] == "A" && input[i - 3]?.[j + 3] == "S") xmas++; // SAMX (diagonal, up-right)
            if (input[i + 1]?.[j - 1] == "M" && input[i + 2]?.[j - 2] == "A" && input[i + 3]?.[j - 3] == "S") xmas++; // XMAS (diagonal, down-left)
            if (input[i + 1]?.[j + 1] == "M" && input[i + 2]?.[j + 2] == "A" && input[i + 3]?.[j + 3] == "S") xmas++; // XMAS (diagonal, down-right)
        }
    }
}

console.log(xmas);