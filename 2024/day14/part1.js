// https://adventofcode.com/2024/day/14
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);
const width = 101, height = 103;

let robots = input.map(robot => ({
    pos: { x: +robot.split("=")[1].split(",")[0], y: +robot.split("=")[1].split(",")[1].split(" ")[0] },
    vel: { x: +robot.split("=")[2].split(",")[0], y: +robot.split("=")[2].split(",")[1].split(" ")[0] }
}));

for (let i = 0; i < 100; i++) {
    robots = robots.map(robot => {
        let newPos = { x: robot.pos.x + robot.vel.x, y: robot.pos.y + robot.vel.y };
        if (newPos.x < 0) newPos.x += width;
        if (newPos.x >= width) newPos.x -= width;
        if (newPos.y < 0) newPos.y += height;
        if (newPos.y >= height) newPos.y -= height;
        return { pos: newPos, vel: robot.vel };
    });
}

let quadrants = [];
for (let i = 0; i < 4; i++) {
    quadrants.push([]);
    for (let j = 0; j < (height - 1) / 2; j++) {
        quadrants[i].push([]);
        for (let k = 0; k < (width - 1) / 2; k++)
            quadrants[i][j].push(0);
    }
}

robots.forEach(robot => {
    if (robot.pos.x == (width - 1) / 2 || robot.pos.y == (height - 1) / 2) return;

    if (robot.pos.x < width / 2 && robot.pos.y < height / 2) quadrants[0][robot.pos.y][robot.pos.x]++;
    else if (robot.pos.x >= width / 2 && robot.pos.y < height / 2) quadrants[1][robot.pos.y][robot.pos.x - (width + 1) / 2]++;
    else if (robot.pos.x < width / 2 && robot.pos.y >= height / 2) quadrants[2][robot.pos.y - (height + 1) / 2][robot.pos.x]++;
    else quadrants[3][robot.pos.y - (height + 1) / 2][robot.pos.x - (width + 1) / 2]++;
});

let safety = quadrants.map(quadrant => quadrant.map(line => line.reduce((a, b) => a + b)).reduce((a, b) => a + b)).reduce((a, b) => a * b);
console.log(safety)