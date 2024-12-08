// https://adventofcode.com/2024/day/7
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

function test(expected, equation, ops) {
    let total = equation[0];
    for (let i = 0; i < ops.length; i++)
        total = ops[i] === "+" ? total + equation[i + 1] : total * equation[i + 1];
    return total == expected;
}

let operations = input.map(line => {
    let value = +line.split(":")[0],
        nums = line.split(":")[1].match(/\d+/g).map(Number);

    let ops = Array(nums.length - 1).fill("+");

    if (test(value, nums, ops)) return ops;
    for (let i = 0; i < 2 ** (nums.length - 1); i++) {
        if (ops[0] == "+") ops[0] = "*";
        else {
            let next = 0;
            while (ops[next] == "*") ops[next++] = "+";
            ops[next] = "*";
        }

        if (test(value, nums, ops)) return ops;
    }
});

console.log(operations.map((operation, i) => operation ? +input[i].split(":")[0] : undefined).filter(operation => operation).reduce((a, b) => a + b));