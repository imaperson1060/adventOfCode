// https://adventofcode.com/2025/day/10
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let machines = input.map(line => {
	let indicators = line.split(" ")[0].split("").slice(1, -1).map(c => c == "#"),
		toggles = line.split(" ").slice(1, -1).map(toggle => toggle.substring(1, toggle.length - 1).split(",").map(Number));
	return { indicators, toggles };
});

function pressButton(indicators, toggle) {
	for (let t of toggle) indicators[t] = !indicators[t];
	return indicators;
}

function pressButtons(indicators, toggles, presses) {
	if (!presses) return indicators;
	for (let i = 0; i < toggles.length; i++) {
		let testIndicators = pressButton(Array.from(indicators), toggles[i]);
		testIndicators = pressButtons(Array.from(testIndicators), toggles.slice(i + 1), presses - 1);
		if (testIndicators.every(v => !v)) return testIndicators;
	}
	return indicators;
}
let allPresses = [];
for (let machine of machines) {
	let presses = 0, result = Array.from(machine.indicators);
	while (!result.every(v => !v)) result = pressButtons(Array.from(machine.indicators), machine.toggles, ++presses);
	allPresses.push(presses);
}
console.log(allPresses.reduce((a, b) => a + b));