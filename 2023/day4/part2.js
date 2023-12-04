// https://adventofcode.com/2023/day/4
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);
console.time();

let cards = input.map(line => ({ winningNums: line.split(": ")[1].split(" | ")[0], card: line.split(": ")[1].split(" | ")[1] }));
cards.map(card => card.winningNums = card.winningNums.split(" ").map(num => parseInt(num)).filter(num => !isNaN(num)));
cards.map(card => card.card = card.card.split(" ").map(num => parseInt(num)).filter(num => !isNaN(num)));

let copies = new Array(cards.length).fill(1);
cards.forEach((card, cardIndex) => {
    let matchingNums = 0;
    card.card.forEach(num => matchingNums += card.winningNums.includes(num) * copies[cardIndex]);
    for (let i = 1; i <= matchingNums / copies[cardIndex]; i++) copies[cardIndex + i] += copies[cardIndex];
});
copies = copies.reduce((acc, num) => acc + num);

console.log(copies);
console.timeEnd();