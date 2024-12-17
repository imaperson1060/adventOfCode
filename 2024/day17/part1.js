// https://adventofcode.com/2024/day/17
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g).filter(x => x).map(x => [ x.split(":")[0], x.split(":")[1].substr(1) ]);

const ops = {
    0: operand => registers.A = Math.floor(registers.A / 2 ** operand), // adv
    1: operand => registers.B ^= operand, // bxl
    2: operand => registers.B = operand % 8, // bst
    3: operand => registers.A && (pointer = operand), // jnz
    4: operand => registers.B ^= registers.C, // bxc
    5: operand => out.push(operand % 8), // out
    6: operand => registers.B = Math.floor(registers.A / 2 ** operand), // bdv
    7: operand => registers.C = Math.floor(registers.A / 2 ** operand) // cdv
}

let registers = { A: +input[0][1], B: +input[1][1], C: +input[2][1] }, program = input[3][1].split(",").map(x => +x), pointer = 0, out = [];

while (pointer < program.length) {
    let opcode = program[pointer], operand = program[pointer + 1];
    pointer += 2;
    ops[opcode](operand <= 3 ? operand : operand == 4 ? registers.A : operand == 5 ? registers.B : operand == 6 ? registers.C : 7);
}

console.log(out.join(","))