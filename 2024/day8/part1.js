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
            let rise = (index[0] - i) * 2,
                run = (index[1] - j) * 2;
            if (rise == 0 && run == 0) return;

            if (i + rise >= 0 && i + rise < input.length && j + run >= 0 && j + run < input[0].length) antinodes.push([ i + rise, j + run ]);
        });
    }
}

antinodes.forEach((pos, i) => {
    for (let j = i + 1; j < antinodes.length; j++)
        if (antinodes[j][0] == pos[0] && antinodes[j][1] == pos[1]) antinodes[j] = [];
});
antinodes = antinodes.filter(x => x.length); // this line was originally inside the above forEach loop, and i was so confused for, like, 10 minutes. then i did part 2 in 15 seconds because IM SO SMART!!

console.log(antinodes.length);