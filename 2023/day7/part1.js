// https://adventofcode.com/2023/day/7
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

const handVals = { high: 0, pair: 1, twoPair: 2, three: 3, fullHouse: 4, four: 5, five: 6 };
const cardVals = "AKQJT98765432";

function getHand(hand) {
    const set = [...new Set(hand)];

    if (set.length == 1) return "five";
    if (set.length == 2) {
        const [ a, b ] = set;
        if ((hand.indexOf(a) == hand.lastIndexOf(a)) || (hand.indexOf(b) == hand.lastIndexOf(b))) return "four";
        return "fullHouse";
    }
    if (set.length == 3) {
        const [ a, b, c ] = set;
        let amtA = 0, amtB = 0, amtC = 0;
        for (let i = 0; i < hand.length; i++) {
            if (hand[i] == a) amtA++;
            if (hand[i] == b) amtB++;
            if (hand[i] == c) amtC++;
        }
        if (amtA == 3 || amtB == 3 || amtC == 3) return "three";
        return "twoPair";
    
    }
    if (set.length == 4) return "pair";
    return "high";
}

console.log(input.sort((a, b) => {
    const [ hand1, bid1 ] = a.split(" ");
    const [ hand2, bid2 ] = b.split(" ");
    const type1 = getHand(hand1);
    const type2 = getHand(hand2);

    if (handVals[type1] > handVals[type2]) return -1;
    if (handVals[type1] < handVals[type2]) return 1;

    for (let i = 0; i < hand1.length; i++) {
        if (cardVals.indexOf(hand1[i]) < cardVals.indexOf(hand2[i])) return -1;
        if (cardVals.indexOf(hand1[i]) > cardVals.indexOf(hand2[i])) return 1;
    }

    if (bid1 > bid2) return -1;
    if (bid1 < bid2) return 1;
    return 0;
}).reduce((acc, hand, i) => acc += hand.split(" ")[1] * (input.length - i), 0));