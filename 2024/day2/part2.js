// https://adventofcode.com/2024/day/2
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

function check(arr) {
    let inc = arr[0] - arr[1] < 0;
    for (let i = 0; i < arr.length - 1; i++) {
        let diff = arr[i + 1] - arr[i];
        if ((diff < 0 && inc) || (diff > 0 && !inc) || Math.abs(diff) < 1 || Math.abs(diff) > 3) return false
    }
    return true;
}

const reports = input.map(line => {
    line = line.split(" ").map(x => +x);

    if (check(line)) return true;
    for (let i = 0; i < line.length; i++) if (check(line.slice(0, i).concat(line.slice(i + 1)))) return true;
    return false;
});

console.log(reports.filter(x => x).length);