// https://adventofcode.com/2025/day/6
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let spacers = input.at(-1).split("").map((x, i) => x != " " ? i : -1).filter(x => x != -1);

let problems = [], total = 0;
for (let i = 0; i < input.length - 1; i++) {
	let numbers = [], current = "", spacer = 0;
	for (let j = 0; j < input[i].length; j++) {
		if (+input[i][j]) current += input[i][j];
		else if (+current) {
			numbers.push(current);
			current = "";
			spacer++;
		} else if (j >= spacers[spacer]) current += "0";
	}
	if (+current) numbers.push(current);
	problems.push(numbers);
	// results in extra leading zeros but those will just be added/multiplied together to form 0 so it doesn't make a difference
}

input.at(-1).split(" ").filter(x => x).forEach((x, i) => {
	let numbers = [], maxDigits = 0;
	for (let j = 0; j < problems.length; j++) {
		let num = problems[j][i];
		numbers.push(num);
		maxDigits = Math.max(maxDigits, Math.ceil(Math.log10(+num)));
	}
	numbers = numbers.map(n => n.padEnd(maxDigits, "0"));

	let columns = [];
	for (let i = 0; i < maxDigits; i++) columns.push(numbers.map(n => n[i]).reduce((a, b) => a + b));

	let subtotal = 1;
	for (let col of columns) {
		col = (+(col.split("").reverse().join(""))).toString().split("").reverse().join(""); // all this to remove trailing zeros 🤮
		if (x == "+") total += +col;
		else if (x == "*") subtotal *= +col;
	}
	if (x == "*") total += subtotal;
});

console.log(total);