// https://adventofcode.com/2023/day/15
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(",");

function hash(input) {
    let value = 0;
    for (let i = 0; i < input.length; i++) {
        value += input.charCodeAt(i);
        value *= 17;
        value = value % 256;
    }
    return value;
}

let boxes = Array.from(Array(256), () => []);
input.forEach(x => {
    if (x.indexOf("=") != -1) {
        let box = hash(x.split("=")[0]);
        if (boxes[box].find(pair => pair[0] == x.split("=")[0])) boxes[box][boxes[box].findIndex(pair => pair[0] == x.split("=")[0])][1] = x.split("=")[1];
        else boxes[box].push(x.split("="));
    }
    if (x.indexOf("-") != -1) {
        let box = hash(x.split("-")[0]);
        for (let i = 0; i < boxes[box].length; i++) { if (boxes[box][i][0] == x.split("-")[0]) delete boxes[box][i]; }
        boxes[box] = boxes[box].filter(x => x.length);
    }
});

let total = 0;
boxes.forEach((box, i) => {
    if (!box.length) return;
    box.forEach((pair, slot) => {
        total += (i + 1) * (slot + 1) * pair[1];
    });
});

console.log(total);