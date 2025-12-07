// https://adventofcode.com/2025/day/7
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let beams = [ input[0].indexOf("S") ], splits = 0;
for (let i = 1; i < input.length; i++) {
	let newBeams = new Set();
	beams.forEach(beam => {
		if (input[i][beam] == "^") {
			newBeams.add(beam - 1);
			newBeams.add(beam + 1);
			splits++;
		} else newBeams.add(beam);
	});
	beams = [...newBeams];
}
console.log(splits);