// https://adventofcode.com/2024/day/12
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g).map(line => line.split(""));

let DIRECTIONS = { UP: [ -1, 0 ], DOWN: [ 1, 0 ], LEFT: [ 0, -1 ], RIGHT: [ 0, 1 ] };
function findTouching(char, pos) {
    let touching = [];
    if (input[pos[0] + DIRECTIONS.UP[0]]?.[pos[1] + DIRECTIONS.UP[1]] == char) touching.push(DIRECTIONS.UP);
    if (input[pos[0] + DIRECTIONS.DOWN[0]]?.[pos[1] + DIRECTIONS.DOWN[1]] == char) touching.push(DIRECTIONS.DOWN);
    if (input[pos[0] + DIRECTIONS.LEFT[0]]?.[pos[1] + DIRECTIONS.LEFT[1]] == char) touching.push(DIRECTIONS.LEFT);
    if (input[pos[0] + DIRECTIONS.RIGHT[0]]?.[pos[1] + DIRECTIONS.RIGHT[1]] == char) touching.push(DIRECTIONS.RIGHT);
    return touching;
}

function tracePlantLine(char, start) {
    let block = new Set(), current = new Set([`${start[0]},${start[1]}`]);

    while (true) {
        let blockSize = block.size,
            next = new Set();
        for (let pos of current) {
            pos = pos.split(",").map(n => +n);
            let touching = findTouching(char, pos);
            if (touching.length)
                for (let direction of touching)
                    next.add(`${pos[0] + direction[0]},${pos[1] + direction[1]}`);
            block.add(`${pos[0]},${pos[1]}`);
        }
        current = next;
        if (block.size == blockSize) break;
    }

    return block;
}

let allCoordinates = new Set(),
    blocks = [];
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (allCoordinates.has(`${i},${j}`)) continue;
        let block = tracePlantLine(input[i][j], [ i, j ]);
        block.forEach(coord => allCoordinates.add(coord));
        blocks.push([...block].map(coord => coord.split(",").map(n => +n)));
    }
}

blocks = blocks.map(block => {
    let area = block.length,
        perimeter = 0;
    block.forEach(coord => perimeter += 4 - findTouching(input[coord[0]][coord[1]], coord).length);
    return area * perimeter;
});

console.log(blocks.reduce((a, b) => a + b));