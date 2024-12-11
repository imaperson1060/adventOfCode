// https://adventofcode.com/2024/day/11
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(" ").map(x => +x);

// yes, i know this is actually slower than my part 2, but this is how i got the first star so i'm leaving it like this
let stones = input;
for (let i = 0; i < 25; i++) {
    for (let j = 0; j < stones.length; j++) {
        if (stones[j] == 0) stones[j] = 1;
        else if (stones[j].toString().length % 2 == 0) {
            let stone = stones[j].toString(), mid = stone.length / 2;
            stones[j] = +stone.substr(0, mid);
            stones.splice(++j, 0, +stone.substr(mid));
        } else stones[j] *= 2024;
    }
}

console.log(stones.length)