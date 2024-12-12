// https://adventofcode.com/2024/day/12
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g).map(line => line.split(""));

let DIRECTIONS = { UP: [ -1, 0 ], UP_LEFT: [ -1, -1 ], UP_RIGHT: [ -1, 1 ], DOWN: [ 1, 0 ], DOWN_LEFT: [ 1, -1 ], DOWN_RIGHT: [ 1, 1 ], LEFT: [ 0, -1 ], RIGHT: [ 0, 1 ] },
    getOpposite = direction => direction == DIRECTIONS.UP ? DIRECTIONS.DOWN : direction == DIRECTIONS.DOWN ? DIRECTIONS.UP : direction == DIRECTIONS.LEFT ? DIRECTIONS.RIGHT : direction == DIRECTIONS.RIGHT ? DIRECTIONS.LEFT : false;

function findTouching(char, pos) {
    let touching = [];
    if (input[pos[0] + DIRECTIONS.UP[0]]?.[pos[1] + DIRECTIONS.UP[1]] == char) touching.push(DIRECTIONS.UP);
    if (input[pos[0] + DIRECTIONS.DOWN[0]]?.[pos[1] + DIRECTIONS.DOWN[1]] == char) touching.push(DIRECTIONS.DOWN);
    if (input[pos[0] + DIRECTIONS.LEFT[0]]?.[pos[1] + DIRECTIONS.LEFT[1]] == char) touching.push(DIRECTIONS.LEFT);
    if (input[pos[0] + DIRECTIONS.RIGHT[0]]?.[pos[1] + DIRECTIONS.RIGHT[1]] == char) touching.push(DIRECTIONS.RIGHT);
    return touching;
}
function findBorders(map, char, pos, diagonal = true) {
    let borders = [];
    if (map[pos[0] + DIRECTIONS.UP[0]]?.[pos[1] + DIRECTIONS.UP[1]] == char) borders.push(DIRECTIONS.UP);
    if (diagonal && map[pos[0] + DIRECTIONS.UP[0]]?.[pos[1] + DIRECTIONS.LEFT[1]] == char) borders.push(DIRECTIONS.UP_LEFT);
    if (diagonal && map[pos[0] + DIRECTIONS.UP[0]]?.[pos[1] + DIRECTIONS.RIGHT[1]] == char) borders.push(DIRECTIONS.UP_RIGHT);
    if (map[pos[0] + DIRECTIONS.DOWN[0]]?.[pos[1] + DIRECTIONS.DOWN[1]] == char) borders.push(DIRECTIONS.DOWN);
    if (diagonal && map[pos[0] + DIRECTIONS.DOWN[0]]?.[pos[1] + DIRECTIONS.LEFT[1]] == char) borders.push(DIRECTIONS.DOWN_LEFT);
    if (diagonal && map[pos[0] + DIRECTIONS.DOWN[0]]?.[pos[1] + DIRECTIONS.RIGHT[1]] == char) borders.push(DIRECTIONS.DOWN_RIGHT);
    if (map[pos[0] + DIRECTIONS.LEFT[0]]?.[pos[1] + DIRECTIONS.LEFT[1]] == char) borders.push(DIRECTIONS.LEFT);
    if (map[pos[0] + DIRECTIONS.RIGHT[0]]?.[pos[1] + DIRECTIONS.RIGHT[1]] == char) borders.push(DIRECTIONS.RIGHT);
    return borders;
}

function convertMap(input) {
    let newMap = [];
    for (let i = 0; i < input.length * 2; i += 2) {
        newMap.push([ "." ]);
        for (let j = 0; j < input[i / 2].length; j++) newMap[i].push(input[i / 2][j], ".");
        newMap.push(new Array(newMap[i].length).fill("."));
    }
    newMap.splice(0, 0, new Array(newMap[0].length).fill("."));
    return newMap;
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

let newMap = convertMap(input); // add padding to map so i can actually draw a perimeter to pathfind (this was what i was trying to do in part 1, but as you can see, it took me 2 hours)

let allCoordinates = new Set(),
    blocks = [];
// find all blocks of plants, taken from part 1
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (allCoordinates.has(`${i},${j}`)) continue;
        let block = tracePlantLine(input[i][j], [ i, j ]);
        block.forEach(coord => allCoordinates.add(coord));
        blocks.push([...block].map(coord => coord.split(",").map(n => +n * 2 + 1)));
    }
}

blocks = blocks.map(block => {
    // mark out the perimeter of the block (corners always get perimeters because they sometimes can be missed or something idk why that's just what i saw in the debugging output thing so i added this)
    let blockMap = newMap.map(row => [...row]), allCoordinates = new Set(), sides = 0;
    block.forEach(coord => findBorders(newMap, ".", coord).forEach(direction => {
        if (!getOpposite(direction) || blockMap[coord[0] + direction[0] * 2]?.[coord[1] + direction[1] * 2] != blockMap[coord[0]][coord[1]]) {
            blockMap[coord[0] + direction[0]][coord[1] + direction[1]] = "#";
            allCoordinates.add(`${coord[0] + direction[0]},${coord[1] + direction[1]}`);
        }
    }));
    // remove any corners that are not actually corners of blocks (if it's surrounded by 4 blanks, it's an oopsy, since all path perimeter tiles will share at least one side with another)
    allCoordinates.forEach(coord => {
        coord = coord.split(",").map(n => +n);
        if (blockMap[coord[0]][coord[1]] == "#" && findBorders(blockMap, ".", coord, false).length == 4) {
            allCoordinates.delete(coord.join(","));
            blockMap[coord[0]][coord[1]] = ".";
        }
    });

    let visited = new Set();
    allCoordinates.forEach(coord => {
        if (visited.has(coord)) return;

        coord = coord.split(",").map(n => +n);
        let at = [...coord], direction = findBorders(blockMap, "#", at, false)[0], initialDirection = direction, seen = new Set();
        do {
            visited.add(`${at[0]},${at[1]}`);
            if (blockMap[at[0] + direction[0]]?.[at[1] + direction[1]] == "#") { // if the next tile is a plant, move forward
                at[0] += direction[0];
                at[1] += direction[1];
                if (seen.has(`${at[0]},${at[1]}`)) sides += 2; // if we've seen this tile before, it means that we overlapped. since the only way for that to happen is if the path loops on itself, and i can't be bothered to turn when that happens, just add 2 sides now to make up for it. (this actually works like wtf this was my last ditch effort??)
                else seen.add(`${at[0]},${at[1]}`);
            } else { // if the next tile is not a plant, turn to [next direction] and move forward
                let borders = findBorders(blockMap, "#", at).filter(facing => facing != getOpposite(direction)); // this always returns only one direction. i had a console.log here to scream (literally, "AHHH") if there was ever more than one. it did scream (several times), actually, until i fixed the corner thing.
                direction = borders[0];
                sides++; // add 1 to the sides count because we're turning
            }
        } while (!(coord[0] == at[0] && coord[1] == at[1] && direction == initialDirection));
    });
    return block.length * sides;
});

console.log(blocks.reduce((a, b) => a + b)); // this thing has 600ms runtime. i don't want to hear any more insults about my code. i did this all by myself, and it works. i'm happy now. 2024 aoc streak saved.