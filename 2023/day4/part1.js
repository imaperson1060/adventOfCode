// https://adventofcode.com/2023/day/4
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let cards = input.map(line => ({ winningNums: line.split(": ")[1].split(" | ")[0], card: line.split(": ")[1].split(" | ")[1] }));
cards.map(card => card.winningNums = card.winningNums.split(" ").map(num => parseInt(num)).filter(num => !isNaN(num)));
cards.map(card => card.card = card.card.split(" ").map(num => parseInt(num)).filter(num => !isNaN(num)));

let winnings = 0;
cards.forEach(card => {
    let cardWinnings = 0;
    card.card.forEach(num => { if (card.winningNums.includes(num)) cardWinnings = !cardWinnings ? 1 : cardWinnings * 2; });
    winnings += cardWinnings;
});

console.log(winnings);