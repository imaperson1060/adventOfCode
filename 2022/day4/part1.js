// https://adventofcode.com/2022/day/4
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let table = input.map(pair => [ [ +pair.split(",")[0].split("-")[0], +pair.split(",")[0].split("-")[1] ], [ +pair.split(",")[1].split("-")[0], +pair.split(",")[1].split("-")[1] ] ]);

let contained = 0;
table.forEach(pair => {
    let longer = +(pair[1][1] - pair[1][0] > pair[0][1] - pair[0][0]);

    if (pair[1 - longer][0] >= pair[longer][0] && pair[1 - longer][pair[1 - longer].length - 1] <= pair[longer][pair[longer].length - 1]) contained++;
});

console.log(contained);