// https://adventofcode.com/2024/day/24
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n\r?\n/g).map(x => x.split(/\r?\n/g));

let inputs = input[0].map(x => ({ name: x.split(":")[0], val: +x.split(" ")[1] })),
    gates = input[1].map(x => ({ operation: x.split(" ")[1], in1: x.split(" ")[0], in2: x.split(" ")[2], out: x.split(" ")[4] })),
    OPERATIONS = { AND: (a, b) => a && b, OR: (a, b) => a || b, XOR: (a, b) => a ^ b };

let finishedGates = [];
while (gates.length) {
    for (let i = gates.length - 1; i >= 0; i--) {
        let in1 = inputs.find(x => x.name == gates[i].in1) || finishedGates.find(x => x.name == gates[i].in1),
            in2 = inputs.find(x => x.name == gates[i].in2) || finishedGates.find(x => x.name == gates[i].in2);
        if (!in1 || !in2) continue;
        finishedGates.push({ name: gates[i].out, val: OPERATIONS[gates[i].operation](in1.val, in2.val) });
        finishedGates.push({ name: gates[i].in1, val: in1.val });
        finishedGates.push({ name: gates[i].in2, val: in2.val });
        delete gates[i];
    }
    gates = gates.filter(x => x);
}

let filteredGates = finishedGates.filter(x => x.name[0] == "z").sort((a, b) => b.name.localeCompare(a.name));
console.log(parseInt(filteredGates.map(x => x.val).join(""), 2));