// https://adventofcode.com/2025/day/3
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

// This is a really smart approach based on github/@x1yl: https://github.com/x1yl/AdventOfCode/blob/master/src/year2025/Day03/utils.java
// I was trying to do something way more complicated, involving shifting arrays and tracking indices, because I'm too dumb to understand what "greatest number" means
// In fairness to me, the examples were especially misleading; they are way simpler than the actual inputs, so the method that worked for them was flawed and I was too stubborn to change it.
const maxes = input.map(line => {
	let batteries = [], maxIndex = -1;

	while (batteries.length < 12) {
		let maxDigit = 0,
			start = maxIndex + 1,
			end = line.length - 12 + batteries.length + 1,
			subline = line.substring(start, end);
		for (let i = 0; i < subline.length; i++) {
			if (+subline[i] > maxDigit) {
				maxIndex = start + i;
				maxDigit = +subline[i];
			}
		}
		batteries.push(maxDigit);
	}

	return +batteries.join("");
});

console.log(maxes.reduce((a, b) => a + b));