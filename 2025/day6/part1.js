// https://adventofcode.com/2025/day/6
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let problems = [], total = 0;
for (let i = 0; i < input.length - 1; i++) problems.push(input[i].split(" ").filter(x => x).map(Number));
input.at(-1).split(" ").filter(x => x).forEach((x, i) => {
	if (x == "+") total += problems.reduce((a, b) => a + b[i], 0);
	else if (x == "*") total += problems.reduce((a, b) => a * b[i], 1);
});
console.log(total);