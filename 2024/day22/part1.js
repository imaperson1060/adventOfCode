// https://adventofcode.com/2024/day/22
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g).map(n => +n);

let mix = (given, secret) => Number(BigInt(given) ^ BigInt(secret)),
    prune = secret => secret % 16777216;

let n = [];
input.forEach(secret => {
    for (let i = 0; i < 2000; i++) {
        secret = mix(secret * 64, secret);
        secret = prune(secret);
        secret = mix(Math.floor(secret / 32), secret);
        secret = prune(secret);
        secret = mix(secret * 2048, secret);
        secret = prune(secret);
    }
    n.push(secret);
});

console.log(n.reduce((a, b) => a + b));