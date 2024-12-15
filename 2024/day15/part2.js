// https://adventofcode.com/2024/day/15
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let DIRECTIONS = { "^": [ -1, 0 ], "v": [ 1, 0 ], "<": [ 0, -1 ], ">": [ 0, 1 ] },
    map = [], directions = [], instructions = false, pos;

input.forEach(line => {
    if (line == "") return instructions = true;
    if (instructions) return directions = [ ...directions, ...line.split("").map(direction => DIRECTIONS[direction]) ];
    let row = [];
    line.split("").forEach(char => {
        if (char == "#") row.push(...[ "#", "#" ]);
        if (char == ".") row.push(...[ ".", "." ]);
        if (char == "O") row.push(...[ "[", "]" ]);
        if (char == "@") row.push(...[ "@", "." ]);
    });
    map.push(row);
    if (line.indexOf("@") != -1) pos = [ map.length - 1, line.indexOf("@") * 2 ];
});

// this is from my first attempt, i think, and it doesn't _really_ work on up/down.
// it does tell me whether i can immediately throw away up/down, though, but only if there's a wall directly above the robot.
// it's a recursive function, and it basically just steps until it can't anymore. it's written terribly, i know. but IT WORKS. DEAL WITH IT.
const findNextOpen = direction => {
    let box;
    switch (direction) {
        case DIRECTIONS["^"]: return next => {
            box = [ next[0] - 1, next[1] ];
            if (map[box[0]][box[1]] == "#") return -1;
            if (map[box[0]][box[1]] == "[" || map[box[0]][box[1]] == "]") box = findNextOpen(DIRECTIONS["^"])(box);
            return box;
        }
        case DIRECTIONS["v"]: return next => {
            box = [ next[0] + 1, next[1] ];
            if (map[box[0]][box[1]] == "#") return -1;
            if (map[box[0]][box[1]] == "[" || map[box[0]][box[1]] == "]") box = findNextOpen(DIRECTIONS["v"])(box);
            return box;
        }
        case DIRECTIONS["<"]: return next => {
            box = [ next[0], next[1] - 1 ];
            if (map[box[0]][box[1]] == "#") return -1;
            if (map[box[0]][box[1]] == "]") box = findNextOpen(DIRECTIONS["<"])([ box[0], box[1] - 1 ]);
            return box;
        }
        case DIRECTIONS[">"]: return next => {
            box = [ next[0], next[1] + 1 ];
            if (map[box[0]][box[1]] == "#") return -1;
            if (map[box[0]][box[1]] == "[") box = findNextOpen(DIRECTIONS[">"])([ box[0], box[1] + 1 ]);
            return box;
        }
    }
}

// this function basically loops through the three possible box states above/below a box, and returns the coordinates of the [ side of the box
// there are only three states because either the box is touching only the left side, only the right side, or it's right in the middle. two boxes can be both touching the left and right sides.
function findConnectedBoxes(box, direction) {
    let touching = new Set();
    if (map[box[0]][box[1]] == "[") {
        if (map[box[0] + direction[0]][box[1]] == "[") touching.add(`${box[0] + direction[0]},${box[1]}`);
        if (map[box[0] + direction[0]][box[1]] == "]") touching.add(`${box[0] + direction[0]},${box[1] - 1}`);
        if (map[box[0] + direction[0]][box[1] + 1] == "[") touching.add(`${box[0] + direction[0]},${box[1] + 1}`);
    }
    return [ ...touching.values() ].map(box => box.split(",").map(n => +n));
}
function buildLayerMap(box, direction) { // this function. this was what made me almost give up. i couldn't figure out how to write it for like 2 hours. 2 HOURS!!
    if (map[box[0]][box[1]] == "]") box = [ box[0], box[1] - 1 ];
    let layers = [ new Set([ `${box[0]},${box[1]}` ]) ];
    do {
        layers.push(new Set());
        layers.at(-2).forEach(box => findConnectedBoxes(box.split(",").map(n => +n), direction).forEach(box => layers.at(-1).add(`${box[0]},${box[1]}`)));
    } while (layers.at(-1).size);
    layers = layers.splice(0, layers.length - 1);
    return layers.map(layer => [ ...layer.values() ].map(box => box.split(",").map(n => +n)));
}
function calculateBoxMovement(pos, direction) {
    let next = [ pos[0] + direction[0], pos[1] + direction[1] ], box = findNextOpen(direction)(pos); // idk why i called the variable box. too lazy to change it now.
    if (box == -1) return false;

    if (direction == DIRECTIONS["^"]) {
        let boxCoordinates = [ [...next] ]; // i shouldn't have called it box since now this is next and that makes no sense
        if (map[next[0]][next[1]] == "[") boxCoordinates.push([ next[0], next[1] + 1 ]);
        else boxCoordinates = [ [ next[0], next[1] - 1 ], ...boxCoordinates ];

        let layerMap = buildLayerMap(next, direction);
        for (let i = layerMap.length - 1; i >= 0; i--) {
            let layer = layerMap[i];
            for (let j = 0; j < layer.length; j++)
                if (map[layer[j][0] - 1][layer[j][1]] == "#" || map[layer[j][0] - 1][layer[j][1] + 1] == "#") return false; // return false if ANY of the boxes will hit a wall (scan from top to bottom) - i'm surprised this worked
        }

        for (let i = layerMap.length - 1; i >= 0; i--) {
            let layer = layerMap[i];
            for (let j = 0; j < layer.length; j++) {
                let box = layer[j];
                map[box[0]][box[1]] = ".";
                map[box[0]][box[1] + 1] = ".";
                map[box[0] - 1][box[1]] = "[";
                map[box[0] - 1][box[1] + 1] = "]";
            }
        }

        return true;
    } else if (direction == DIRECTIONS["v"]) {
        let boxCoordinates = [ [...next] ];
        if (map[next[0]][next[1]] == "[") boxCoordinates.push([ next[0], next[1] + 1 ]);
        else boxCoordinates = [ [ next[0], next[1] - 1 ], ...boxCoordinates ];

        let layerMap = buildLayerMap(next, direction);
        for (let i = layerMap.length - 1; i >= 0; i--) {
            let layer = layerMap[i];
            for (let j = 0; j < layer.length; j++)
                if (map[layer[j][0] + 1][layer[j][1]] == "#" || map[layer[j][0] + 1][layer[j][1] + 1] == "#") return false;
        }

        for (let i = layerMap.length - 1; i >= 0; i--) {
            let layer = layerMap[i];
            for (let j = 0; j < layer.length; j++) {
                let box = layer[j];
                map[box[0]][box[1]] = ".";
                map[box[0]][box[1] + 1] = ".";
                map[box[0] + 1][box[1]] = "[";
                map[box[0] + 1][box[1] + 1] = "]";
            }
        }

        return true;
    } else if (direction == DIRECTIONS["<"]) {
        let pointer = pos[1]; // since i'm too lazy to actually *move* the boxes, the pointer just flips them from [ to ] and vice versa; the first . becomes the new @ and the last . becomes a ] because it has to be an end-box (that's what i'm calling it)
        while (pointer >= box[1]) {
            if (map[pos[0]][pointer] == "]") map[pos[0]][pointer] = "[";
            else if (map[pos[0]][pointer] == "[") map[pos[0]][pointer] = "]";
            else map[pos[0]][pointer] = "[";
            pointer--;
        }
        return true;
    } else if (direction == DIRECTIONS[">"]) {
        let pointer = pos[1];
        while (pointer <= box[1]) {
            if (map[pos[0]][pointer] == "]") map[pos[0]][pointer] = "[";
            else if (map[pos[0]][pointer] == "[") map[pos[0]][pointer] = "]";
            else map[pos[0]][pointer] = "]";
            pointer++;
        }
        return true;
    }
}

directions.forEach((direction, i) => {
    let next = [ pos[0] + direction[0], pos[1] + direction[1] ];
    if (map[next[0]][next[1]] == "#") return;
    if (map[next[0]][next[1]] == ".") {
        map[pos[0]][pos[1]] = ".";
        map[next[0]][next[1]] = "@";
    } else {
        if (!calculateBoxMovement(pos, direction)) return;
        map[pos[0]][pos[1]] = ".";
        map[next[0]][next[1]] = "@";
    }
    pos = next;
});

let gps = 0;
map.forEach((line, i) => line.forEach((char, j) => gps += char == "[" ? 100 * i + j : 0));
console.log(gps);