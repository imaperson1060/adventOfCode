// https://adventofcode.com/2023/day/5
// imaperson1060

const input = require("fs").readFileSync("./input.txt", "utf-8").split(/\r?\n/g);

let seeds = [];
let maps = { "seed-to-soil": [], "soil-to-fertilizer": [], "fertilizer-to-water": [], "water-to-light": [], "light-to-temperature": [], "temperature-to-humidity": [], "humidity-to-location": [] };
let mode = "";

input.filter(x => x).forEach(line => {
    if (line.startsWith("seeds:")) {
        let seedArray = line.replace("seeds: ", "").split(" ").filter(x => !isNaN(x)).map(x => parseInt(x));
        for (let i = 0; i < seedArray.length; i += 2) seeds.push([ seedArray[i], seedArray[i] + seedArray[i + 1] ]);
        return;
    }
    if (line.indexOf("map") != -1) return mode = line.replace(" map:", "");

    const [ dest, source, range ] = line.split(" ").filter(x => !isNaN(x)).map(x => parseInt(x));
    return maps[mode].push({ dest, source, range });
});

function getLocation(seed) {
    let soil, fertilizer, water, light, temperature, humidity, location;

    let soilFilter = soil => seed >= soil.source && seed < soil.source + soil.range;
    let fertilizerFilter = fertilizer => soil >= fertilizer.source && soil < fertilizer.source + fertilizer.range;
    let waterFilter = water => fertilizer >= water.source && fertilizer < water.source + water.range;
    let lightFilter = light => water >= light.source && water < light.source + light.range;
    let temperatureFilter = temperature => light >= temperature.source && light < temperature.source + temperature.range;
    let humidityFilter = humidity => temperature >= humidity.source && temperature < humidity.source + humidity.range;
    let locationFilter = location => humidity >= location.source && humidity < location.source + location.range;

    soil = maps["seed-to-soil"].filter(soilFilter)[0] ? seed + maps["seed-to-soil"].filter(soilFilter)[0].dest - maps["seed-to-soil"].filter(soilFilter)[0].source : seed;
    fertilizer = maps["soil-to-fertilizer"].filter(fertilizerFilter)[0] ? soil + maps["soil-to-fertilizer"].filter(fertilizerFilter)[0].dest - maps["soil-to-fertilizer"].filter(fertilizerFilter)[0].source : soil;
    water = maps["fertilizer-to-water"].filter(waterFilter)[0] ? fertilizer + maps["fertilizer-to-water"].filter(waterFilter)[0].dest - maps["fertilizer-to-water"].filter(waterFilter)[0].source : fertilizer;
    light = maps["water-to-light"].filter(lightFilter)[0] ? water + maps["water-to-light"].filter(lightFilter)[0].dest - maps["water-to-light"].filter(lightFilter)[0].source : water;
    temperature = maps["light-to-temperature"].filter(temperatureFilter)[0] ? light + maps["light-to-temperature"].filter(temperatureFilter)[0].dest - maps["light-to-temperature"].filter(temperatureFilter)[0].source : light;
    humidity = maps["temperature-to-humidity"].filter(humidityFilter)[0] ? temperature + maps["temperature-to-humidity"].filter(humidityFilter)[0].dest - maps["temperature-to-humidity"].filter(humidityFilter)[0].source : temperature;
    location = maps["humidity-to-location"].filter(locationFilter)[0] ? humidity + maps["humidity-to-location"].filter(locationFilter)[0].dest - maps["humidity-to-location"].filter(locationFilter)[0].source : humidity;

    return location;
}

let lowestSeed = Infinity;
seeds.forEach(seedRange => {
    for (let i = seedRange[0]; i < seedRange[1]; i++)
        if (getLocation(i) < lowestSeed) console.log("Updated lowest:", lowestSeed = getLocation(i));
    console.log("Done with range", seedRange);
});
console.log(lowestSeed);