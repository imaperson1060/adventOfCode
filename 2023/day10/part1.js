// https://adventofcode.com/2023/day/10
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let map = [], newMap = [], sPos, step = -1;
input.forEach(line => map.push(line.split("")));
map.forEach(line => newMap.push(new Array(line.length).fill(".")));
sPos = map.reduce((acc, cur, i) => cur.indexOf("S") != -1 ? [ i, cur.indexOf("S") ] : acc, []);
newMap[sPos[0]][sPos[1]] = ++step;

const getPos = (pos) => map[pos[0]][pos[1]];
function getAdjacent(pos, prevPos) {
    let adj = [];
    if (pos[0] > 0 && [ "S", "|", "L", "J" ].indexOf(getPos(pos)) != -1 && [ "-", "L", "J" ].indexOf(getPos([ pos[0] - 1, pos[1] ])) == -1) adj.push([ pos[0] - 1, pos[1] ]);
    if (pos[0] < map.length - 1 && [ "S", "|", "7", "F" ].indexOf(getPos(pos)) != -1 && [ "-", "7", "F" ].indexOf(getPos([ pos[0] + 1, pos[1] ])) == -1) adj.push([ pos[0] + 1, pos[1] ]);
    if (pos[1] > 0 && [ "S", "-", "J", "7" ].indexOf(getPos(pos)) != -1 && [ "|", "J", "7" ].indexOf(getPos([ pos[0], pos[1] - 1 ])) == -1) adj.push([ pos[0], pos[1] - 1 ]);
    if (pos[1] < map[0].length - 1 && [ "S", "-", "L", "F" ].indexOf(getPos(pos)) != -1 && [ "|", "L", "F" ].indexOf(getPos([ pos[0], pos[1] + 1 ])) == -1) adj.push([ pos[0], pos[1] + 1 ]);
    return adj.filter(pos => pos[0] != prevPos?.[0] || pos[1] != prevPos?.[1]);
}

let round = [ sPos ];
while (round.length) {
    step++;
    let nextRound = [];
    round.forEach(pos => {
        getAdjacent(pos).filter(pos => getPos(pos) != "." && newMap[pos[0]][pos[1]] == ".").forEach(newPos => {
            newMap[newPos[0]][newPos[1]] = step;
            nextRound.push(newPos);
        });
    });
    round = nextRound;
    if (!round.length) step--;
}

// require("fs").writeFileSync("./output.txt", newMap.map((line, i) => line.map((x, j) => " " + getPos([ i, j ]) + x.toString().padStart(4, "0")).join("")).join("\n"));
console.log(step);