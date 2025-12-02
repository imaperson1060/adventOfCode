// https://adventofcode.com/2025/day/2
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(",");

const ranges = input.map(range => range = range.split("-"));

let total = 0;
ranges.forEach(range => {
    const [ start, end ] = range;

    let possibleLength = start.length;
    if (start.length != end.length && end.length % 2 == 0) possibleLength = end.length; // that means start.length is odd, unless the range is more than 2 orders of magnitude bigger (i dont think that happens)

    if (possibleLength % 2 != 0) return; // odd number of digits cant be split in half
    let possibleNums = new Array(possibleLength / 2).fill(null);
    for (let i = 0; i < possibleLength / 2; i++) {
        if (start[i - (end.length - start.length)] == end[i]) possibleNums[i] = +end[i];
        else break;
    }

    const getFullNum = check => +(check.toString() + check.toString());

    let checkNum = +possibleNums.map(x => x || "0").join("");
    let missingDigits = possibleNums.length - possibleNums.filter(x => x).length;
    if (!missingDigits && getFullNum(checkNum) >= +start && getFullNum(checkNum) <= +end) total += getFullNum(checkNum);

    for (let i = 0; i < Math.pow(10, missingDigits); i++) {
        checkNum++;
        if (getFullNum(checkNum) >= +start && getFullNum(checkNum) <= +end) total += getFullNum(checkNum);
    }
});

console.log(total);