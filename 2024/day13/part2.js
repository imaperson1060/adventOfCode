// https://adventofcode.com/2024/day/13
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n\r?\n/g).map(group => group.split(/\r?\n/g));

let machines = input.map(machine => ({
    A: { x: +machine[0].split(" ")[2].split("+")[1].split(",")[0], y: +machine[0].split(" ")[3].split("+")[1] },
    B: { x: +machine[1].split(" ")[2].split("+")[1].split(",")[0], y: +machine[1].split(" ")[3].split("+")[1] },
    prize: { x: +machine[2].split(" ")[1].split("=")[1].split(",")[0] + 10000000000000, y: +machine[2].split(" ")[2].split("=")[1] + 10000000000000 }
}));

let tokens = 0;
machines.forEach(machine => {
    // i figured this out using desmos lol https://www.desmos.com/calculator/nlz5nq8wq5
    let equations = [ { x: machine.A.x, y: machine.B.x, z: machine.prize.x}, { x: machine.A.y, y: machine.B.y, z: machine.prize.y } ],
        m = -equations[0].x / equations[1].x,
        b = (equations[0].z + m * equations[1].z) / (equations[0].y + m * equations[1].y),
        a = (equations[0].z - b * equations[0].y) / equations[0].x;

    if (a > 0 && b > 0 && Math.abs(a - Math.round(a)) < 0.01 && Math.abs(b - Math.round(b)) < 0.01) tokens += Math.round(a) * 3 + Math.round(b);
});

console.log(tokens);