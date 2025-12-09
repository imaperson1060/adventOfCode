// https://adventofcode.com/2025/day/9
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g).map(line => line.split(",").map(Number));

let largest = 0;
for (let pair of input) {
	for (let pair2 of input) {
		let size = (Math.abs(pair[0] - pair2[0]) + 1) * (Math.abs(pair[1] - pair2[1]) + 1);
		if (size > largest) largest = size;
	}
}
console.log(largest);