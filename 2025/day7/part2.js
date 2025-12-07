// https://adventofcode.com/2025/day/7
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let timelines = new Array(input[0].length).fill(0);
timelines[input[0].indexOf("S")] = 1;
for (let i = 1; i < input.length; i++) {
	let newTimelines = new Array(input[0].length).fill(0);
	for (let j = 0; j < timelines.length; j++) {
		if (input[i][j] == "^") {
			newTimelines[j - 1] += timelines[j];
			newTimelines[j + 1] += timelines[j];
		} else newTimelines[j] += timelines[j];
	}
	timelines = newTimelines;
}
console.log(timelines.reduce((a, b) => a + b));