// https://adventofcode.com/2025/day/11
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

const devices = input.map(line => ({ name: line.split(":")[0], outputs: line.split(":")[1].trim().split(" ") }));

let current = [ devices.find(d => d.name == "you") ], count = 0;
while (current.length) {
	let newCurrent = [];
	for (let d of current)
		for (let output of d.outputs)
			newCurrent.push(output);
	count += newCurrent.filter(d => d == "out").length;
	current = newCurrent.map(d => devices.find(device => device.name == d)).filter(d => d);
}
console.log(count);