// https://adventofcode.com/2025/day/2
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(",");

const ranges = input.map(range => range = range.split("-").map(Number));

let total = 0;
ranges.forEach(range => {
    const [start, end] = range;
    for (let i = start; i <= end; i++) {
        let str = i.toString();
        for (let j = 1; j < Math.floor(str.length / 2) + 1; j++) {
            if (str.length % j != 0) continue; // evenly goes into number of digits
            let pass = true;
            let val = str.slice(0, j);
            for (let k = j; k < str.length; k += j)
                if (str.slice(k, k + j) != val) {
                    pass = false;
                    break;
                }
            if (pass) {
                total += i;
                break;
            }
        }
    }
});
console.log(total);