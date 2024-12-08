// https://adventofcode.com/2024/day/8
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g).map(line => line.split(""));

let antinodes = [];

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] == ".") continue;

        let indicies = [];
        for (let k = 0; k < input.length; k++) {
            let rowIndicies = [];
            while (input[k].indexOf(input[i][j], rowIndicies.at(-1) ? rowIndicies.at(-1)[1] + 1 : undefined) != -1)
                rowIndicies.push([ k, input[k].indexOf(input[i][j], rowIndicies.at(-1) ? rowIndicies.at(-1)[1] + 1 : undefined) ]);
            indicies.push(...rowIndicies);
        }

        indicies.forEach(index => {
            let rise = index[0] - i,
                run = index[1] - j,
                m = 1;
            if (rise == 0 && run == 0) return;

            while (i + rise * m >= 0 && i + rise * m < input.length && j + run * m >= 0 && j + run * m < input[0].length) antinodes.push([ i + rise * m, j + run * m++ ]);
        });
    }
}

antinodes.forEach((pos, i) => {
    for (let j = i + 1; j < antinodes.length; j++)
        if (antinodes[j][0] == pos[0] && antinodes[j][1] == pos[1]) antinodes[j] = [];
});
antinodes = antinodes.filter(x => x.length);

console.log(antinodes.length);