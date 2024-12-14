// https://adventofcode.com/2024/day/14
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);
const width = 101, height = 103;

let robots = input.map(robot => ({
    pos: { x: +robot.split("=")[1].split(",")[0], y: +robot.split("=")[1].split(",")[1].split(" ")[0] },
    vel: { x: +robot.split("=")[2].split(",")[0], y: +robot.split("=")[2].split(",")[1].split(" ")[0] }
}));

// this is all written after my solve - i just bruteforced 100000 and did the lowest one
function simulateSeconds(start, end = start + 1) {
    let newRobots = [], avgDistances = [];

    newRobots = robots.map(robot => {
        let newPos = { x: robot.pos.x + robot.vel.x * start, y: robot.pos.y + robot.vel.y * start };
        if (newPos.x < 0) newPos.x = width + newPos.x % width;
        if (newPos.x >= width) newPos.x %= width;
        if (newPos.y < 0) newPos.y = height + newPos.y % height;
        if (newPos.y >= height) newPos.y %= height;
        return { pos: newPos, vel: robot.vel };
    });

    for (let i = start; i < end; i++) {
        newRobots = newRobots.map(robot => {
            let newPos = { x: robot.pos.x + robot.vel.x, y: robot.pos.y + robot.vel.y };
            if (newPos.x < 0) newPos.x += width;
            if (newPos.x >= width) newPos.x -= width;
            if (newPos.y < 0) newPos.y += height;
            if (newPos.y >= height) newPos.y -= height;
            return { pos: newPos, vel: robot.vel };
        });

        // i had to find out what a tree looked like from reddit because the puzzle text is extremely vague
        // all it had to say was "the robots should arrange themselves into a *small* picture of a christmas tree in the *center of the lobby*" and it would've been enough (even without specifying it's small it would've been fine)
        let center = { x: (width - 1) / 2, y: (height - 1) / 2 }, distance = 0;
        newRobots.forEach(robot => distance += Math.sqrt((robot.pos.x - center.x) ** 2 + (robot.pos.y - center.y) ** 2));
        distance /= newRobots.length;
        avgDistances.push({ i, distance });
    }

    return { avgDistances, robots: newRobots };
}

const rl = require("readline").createInterface({ input: process.stdin, output: process.stdout, terminal: false }), confirm = async () => await new Promise(resolve => rl.question("Is this a Christmas tree? (y/N) ", resolve));

let interval = 5000, start = 0, end = start + interval, simulation, tree;
(async () => {
    do {
        simulation = simulateSeconds(start, end), tree = simulation.avgDistances.sort((a, b) => a.distance - b.distance)[0].i, start += interval, end += interval;

        let grid = [];
        for (let i = 0; i < height; i++) {
            grid.push([]);
            for (let j = 0; j < width; j++)
                grid[i][j] = 0;
        }
        simulateSeconds(tree).robots.forEach(robot => grid[robot.pos.y][robot.pos.x]++);

        console.log(grid.map(line => line.join("").replaceAll("0", ".")).join("\n"));
    } while ((await confirm()).toLowerCase() != "y");

    rl.close();
    console.log(tree + 1);
})();