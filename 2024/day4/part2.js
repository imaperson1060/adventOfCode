// https://adventofcode.com/2024/day/4
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g).map(x => x.split(""));

let xmas = 0;

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (input[i + 1]?.[j + 1] == "A") { // ahhh i had (input[i + 1]?.[j + 1] == "A" || input[i - 1]?.[j - 1] == "A") which was counting some things twice, that wasted like 10 minutes 😭
            if (
                input[i][j] == "M" && input[i][j + 2] == "M" && input[i + 2]?.[j] == "S" && input[i + 2]?.[j + 2] == "S" || // M.M / .A. / S.S
                input[i][j] == "M" && input[i][j + 2] == "S" && input[i + 2]?.[j] == "M" && input[i + 2]?.[j + 2] == "S" || // M.S / .A. / M.S
                input[i][j] == "S" && input[i][j + 2] == "S" && input[i + 2]?.[j] == "M" && input[i + 2]?.[j + 2] == "M" || // S.S / .A. / M.M
                input[i][j] == "S" && input[i][j + 2] == "M" && input[i + 2]?.[j] == "S" && input[i + 2]?.[j + 2] == "M" // S.M / .A. / S.M
            ) xmas++;
        }
    }
}

console.log(xmas);