// https://adventofcode.com/2024/day/13
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n\r?\n/g).map(group => group.split(/\r?\n/g));

let machines = input.map(machine => ({
    A: { x: +machine[0].split(" ")[2].split("+")[1].split(",")[0], y: +machine[0].split(" ")[3].split("+")[1] },
    B: { x: +machine[1].split(" ")[2].split("+")[1].split(",")[0], y: +machine[1].split(" ")[3].split("+")[1] },
    prize: { x: +machine[2].split(" ")[1].split("=")[1].split(",")[0], y: +machine[2].split(" ")[2].split("=")[1] }
}));

let tokens = 0;
machines.forEach(machine => {
    let combosX = [], combosY = [];

    // all this code was written first try, and it actually worked!!
    // and yes, i could've used the same method as in part 2, but then this code that i did all by myself would be lost
    for (let i = 0; i < 100; i++) {
        let A = i, B = 0;
        while (A * machine.A.x + B * machine.B.x < machine.prize.x) B++;
        if (A * machine.A.x + B * machine.B.x == machine.prize.x) combosX.push({ A, B });
    }
    for (let i = 0; i < 100; i++) {
        let A = i, B = 0;
        while (A * machine.A.y + B * machine.B.y < machine.prize.y) B++;
        if (A * machine.A.y + B * machine.B.y == machine.prize.y) combosY.push({ A, B });
    }

    for (let i = 0; i < combosX.length; i++)
        for (let j = 0; j < combosY.length; j++)
            if (combosX[i].A == combosY[j].A && combosX[i].B == combosY[j].B) return tokens += 3 * combosX[i].A + combosX[i].B;
});

console.log(tokens);