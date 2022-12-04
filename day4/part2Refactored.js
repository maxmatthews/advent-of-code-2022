const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");
const allLines = fileContents.split(/\r?\n/);

let overlapCounter = 0;

//SOURCE: https://stackoverflow.com/questions/47667827/javascript-check-numeric-range-overlapping-in-array
//I broke down and looked up overlapping ranges. 😞 Which prompted a variable name refactor.
//I knew a function using the start and finish numbers with <= or >= was possible, just couldn't
//come up with it on my own. 🧠🔥
const areOverlapping = (a, b) => {
  if (b.start <= a.start) {
    return b.finish >= a.start;
  } else {
    return b.start <= a.finish;
  }
};

for (const line of allLines) {
  //input: a-b,x-y
  const rangeAString = line.split(",")[0]; //output: a-b
  const rangeBString = line.split(",")[1]; //output: x-y

  const rangeA = {
    start: parseInt(rangeAString.split("-")[0]), //a as int
    finish: parseInt(rangeAString.split("-")[1]), //b as int
  };
  const rangeB = {
    start: parseInt(rangeBString.split("-")[0]), //x as int
    finish: parseInt(rangeBString.split("-")[1]), //y as int
  };

  if (areOverlapping(rangeA, rangeB)) {
    overlapCounter++;
  }
}

console.log(overlapCounter);
