// https://adventofcode.com/2025/day/5
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let ranges = [];
for (let line of input) {
    if (!line) break;
    ranges.push(line.split("-").map(Number));
}

for (let i = ranges.length - 1; i > 0; i--) {
	let [ start1, end1 ] = ranges[i];
	for (let j = 0; j < ranges.length; j++) {
		if (i == j || !ranges[j]) continue;
		let [ start2, end2 ] = ranges[j];
		if (start2 <= end1 && end1 <= end2) {
			ranges[j][0] = Math.min(start1, start2);
			ranges[i] = null;
			break;
		} else if (end2 >= start1 && start1 >= start2) {
			ranges[j][1] = Math.max(end1, end2);
			ranges[i] = null;
			break;
		}
	}
}
ranges = ranges.filter(r => r);

console.log(ranges.map(x => x[1] - x[0] + 1).reduce((a, b) => a + b));