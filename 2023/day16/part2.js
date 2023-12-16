// https://adventofcode.com/2023/day/16
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g).map(line => line.split(""));

function calc(start) {
    let map = Array.from({ length: input.length }, () => Array.from({ length: input[0].length }, () => "."));
    let history = [];
    let current = [ start ];

    while (current.length) {
        let next = [];
        for (let i = 0; i < current.length; i++) {
            let [ y, x, deltaY, deltaX ] = current[i];
            history.push(current[i]);
    
            switch (input[y + deltaY][x + deltaX]) {
                case ".":
                    next.push([ y + deltaY, x + deltaX, deltaY, deltaX ]);
                    break;
                case "/":
                    next.push([ y + deltaY, x + deltaX, -deltaX, -deltaY ]);
                    break;
                case "\\":
                    next.push([ y + deltaY, x + deltaX, deltaX, deltaY ]);
                    break;
                case "|":
                    next.push([ y + deltaY, x + deltaX, deltaY || 1, 0 ]);
                    if (!deltaY) next.push([ y + deltaY, x + deltaX, -1, 0 ]);
                    break;
                case "-":
                    next.push([ y + deltaY, x + deltaX, 0, deltaX || 1 ]);
                    if (!deltaX) next.push([ y + deltaY, x + deltaX, 0, -1 ]);
                    break;
            }
            map[y][x] = "#";
            map[y + deltaY][x + deltaX] = "#";
        }
    
        current = Array.from(new Set(next.filter(set => {
            let [ y, x, deltaY, deltaX ] = set;
            return !(history.find(set => set[0] == y && set[1] == x && set[2] == deltaY && set[3] == deltaX) || y + deltaY < 0 || y + deltaY >= input.length || x + deltaX < 0 || x + deltaX >= input[0].length);
        }).map(JSON.stringify)), JSON.parse);
    }

    return map;
}

let highest = 0;
for (let i = 0; i < input[0].length; i++) {
    let path = calc([ 0, i, 1, 0 ]).reduce((acc, line) => line.reduce((acc, char) => char == "#" ? acc + 1 : acc, acc), 0);
    if (path > highest) highest = path;
}
for (let i = 0; i < input.length; i++) {
    let path = calc([ i, 0, 0, 1 ]).reduce((acc, line) => line.reduce((acc, char) => char == "#" ? acc + 1 : acc, acc), 0);
    if (path > highest) highest = path;
}
for (let i = input.length; i > 0; i--) {
    let path = calc([ 0, i - 1, 0, -1 ]).reduce((acc, line) => line.reduce((acc, char) => char == "#" ? acc + 1 : acc, acc), 0);
    if (path > highest) highest = path
}
for (let i = input.length; i > 1; i--) {
    let path = calc([ i - 1, 0, -1, 0 ]).reduce((acc, line) => line.reduce((acc, char) => char == "#" ? acc + 1 : acc, acc), 0);
    if (path > highest) highest = path;
}

console.log(highest);