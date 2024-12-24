// https://adventofcode.com/2024/day/23
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g).map(x => x.split("-"));

let allTriplets = new Set();
input.forEach(pair => {
    let otherPairs = input.filter(x => x.indexOf(pair[0]) != -1 ^ x.indexOf(pair[1]) != -1),
        common = [];
    otherPairs.forEach(x => {
        let notSpecial;
        if (x.indexOf(pair[0]) != -1) notSpecial = x[1 - x.indexOf(pair[0])];
        else notSpecial = x[1 - x.indexOf(pair[1])];
        if (otherPairs.find(y => !(y[0] == x[0] && y[1] == x[1]) && y.indexOf(notSpecial) != -1)) common.push(x);
    });
    if (common.length < 2) return;
    let matches = [];
    common.forEach(x => {
        let notSpecial;
        if (x.indexOf(pair[0]) != -1) notSpecial = x[1 - x.indexOf(pair[0])];
        else notSpecial = x[1 - x.indexOf(pair[1])];
        if (common.find(y => !(y[0] == x[0] && y[1] == x[1]) && (y.indexOf(notSpecial) != -1))) matches.push(x);
    });
    let triplets = new Set();
    let start = pair[0];
    matches.filter(match => match.indexOf(start) != -1).forEach(match => {
        let notStart = match[1 - match.indexOf(start)];
        let triplet = [ start, notStart, pair[1] ].sort().join(",");
        triplets.add(triplet);
    });

    for (const triplet of triplets)
        if (triplet.split(",").find(x => x[0] == "t")) allTriplets.add(triplet);
});

console.log(allTriplets.size)