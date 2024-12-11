// https://adventofcode.com/2024/day/11
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(" ").map(x => +x);

let stones = {}, evens = [], odds = [];
input.forEach(x => {
    stones[x] = 1;
    if (x == 0) return;
    if (x.toString().length % 2 == 0) evens.push(x);
    else odds.push(x);
});

for (let i = 0; i < 75; i++) {
    let newStones = {}, newEvens = new Set(), newOdds = new Set();

    if (stones[0]) newStones[1] = stones[0];
    if (stones[0] > 0) newOdds.add(1);

    for (let j = 0; j < evens.length; j++) {
        let mid = evens[j].toString().length / 2, first = +evens[j].toString().slice(0, mid), second = +evens[j].toString().slice(mid);
        newStones[first] = (newStones[first] || 0) + stones[evens[j]];
        newStones[second] = (newStones[second] || 0) + stones[evens[j]];

        if (first.toString().length % 2 == 0) newEvens.add(first);
        else if (first != 0) newOdds.add(first);

        if (second.toString().length % 2 == 0) newEvens.add(second);
        else if (second != 0) newOdds.add(second);
    }
    for (let j = 0; j < odds.length; j++) {
        newStones[odds[j] * 2024] = (newStones[odds[j] * 2024] || 0) + stones[odds[j]];
        if ((odds[j] * 2024).toString().length % 2 == 0) newEvens.add(odds[j] * 2024);
        else newOdds.add(odds[j] * 2024);
    }

    evens = [...newEvens];
    odds = [...newOdds];
    stones = newStones;
}

let stoneCount = 0;
for (let stone in stones) stoneCount += stones[stone];
console.log(stoneCount);