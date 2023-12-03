// https://adventofcode.com/2023/day/3
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let grid = input.map(row => row.split(""));
let sum = 0;
grid.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
        if (!isNaN(cell) || cell == ".") return;

        let coordinatesList = [];

        if (!isNaN(grid[rowIndex - 1][cellIndex - 1])) coordinatesList.push([ rowIndex - 1, cellIndex - 1 ]); // Top left
        if (!isNaN(grid[rowIndex - 1][cellIndex])) coordinatesList.push([ rowIndex - 1, cellIndex ]); // Top center
        if (!isNaN(grid[rowIndex - 1][cellIndex + 1])) coordinatesList.push([ rowIndex - 1, cellIndex + 1 ]); // Top right
        if (!isNaN(grid[rowIndex][cellIndex - 1])) coordinatesList.push([ rowIndex, cellIndex - 1 ]); // Left
        if (!isNaN(grid[rowIndex][cellIndex + 1])) coordinatesList.push([ rowIndex, cellIndex + 1 ]); // Right
        if (!isNaN(grid[rowIndex + 1][cellIndex - 1])) coordinatesList.push([ rowIndex + 1, cellIndex - 1 ]); // Bottom left
        if (!isNaN(grid[rowIndex + 1][cellIndex])) coordinatesList.push([ rowIndex + 1, cellIndex ]); // Bottom
        if (!isNaN(grid[rowIndex + 1][cellIndex + 1])) coordinatesList.push([ rowIndex + 1, cellIndex + 1 ]); // Bottom right

        coordinatesList.forEach(coordinates => {
            let number = [];
            while (!isNaN(grid[coordinates[0]][coordinates[1] - 1])) coordinates[1]--;
            while (!isNaN(grid[coordinates[0]][coordinates[1]])) {
                number.push(grid[coordinates[0]][coordinates[1]]);
                grid[coordinates[0]][coordinates[1]] = ".";
                coordinates[1]++;
            }
            if (number.length) sum += number.reduce((acc, num, i) => acc + (num * Math.pow(10, number.length - i - 1)), 0);
        });
    });
});

console.log(sum);