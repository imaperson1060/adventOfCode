// https://adventofcode.com/2025/day/8
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g).map(line => line.split(",").map(Number));
const calcDistance = (pos1, pos2) => Math.abs(
	Math.sqrt(
		Math.pow(pos2[0] - pos1[0], 2)
		+ Math.pow(pos2[1] - pos1[1], 2)
		+ Math.pow(pos2[2] - pos1[2], 2)
	)
);

let circuits = Array.from({ length: input.length }, (_, i) => [i]);
let junctions = Array.from({ length: input.length }, (_, i) => ({ id: i, circuit: i, distances: new Array(input.length).fill(Infinity) }));

let smallestDistances = [];
for (let i = 0; i < junctions.length; i++) {
	for (let j = 0; j < junctions.length; j++) {
		if (j == i) continue;
		smallestDistances.push({ circuit: [i,j].sort().join(), dist: calcDistance(input[i], input[j]) });
	}
}

smallestDistances = smallestDistances.sort((a,b) => a.dist - b.dist);
for (let pair of smallestDistances) {
	let junction1 = junctions[pair.circuit.split(",")[0]], junction2 = junctions[pair.circuit.split(",")[1]];
	if (junction1.circuit == junction2.circuit) continue;
	let oldCircuit = junction1.circuit, destination = junction2.circuit;
	for (let j = circuits[oldCircuit].length - 1; j >= 0; j--) {
		junctions[circuits[oldCircuit][j]].circuit = destination;
		circuits[destination].push(circuits[oldCircuit].pop());
	}
	if (circuits[destination].length == input.length) {
		let result = pair.circuit.split(",").map(j => input[j][0]);
		console.log(result[0] * result[1]);
		break;
	}
}