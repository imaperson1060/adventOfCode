// https://adventofcode.com/2023/day/9
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

console.log(input.map(line => {
    line = line.split(" ").map(num => +num);
    let layers = [ line ];

    while (layers.at(-1).some(num => num)) {
        layers.push([]);
        for (let i = 1; i < layers.at(-2).length; i++) layers.at(-1).push(layers.at(-2)[i] - layers.at(-2)[i - 1]);
    }

    layers[layers.length - 1] = 0;
    for (let i = layers.length - 2; i >= 0; i--) layers[i] = layers[i].at(-1) + layers[i + 1];

    return layers[0];
}).reduce((acc, num) => acc + num));