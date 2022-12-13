const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");
// const fileContents = fs.readFileSync("./exampleInput.txt", "utf-8");
const allLines = fileContents.split(/\r?\n/);

//initialize variables
let x = 1;
let cycleCount = 0;

let output = [["#"], [], [], [], [], []];

//move this into a function because we need to check it frequently
const cycleComplete = () => {
  let rowNum;

  //could have solved this with a Math.floor / 40
  if (cycleCount < 40) {
    rowNum = 0;
  } else if (cycleCount < 80) {
    rowNum = 1;
  } else if (cycleCount < 120) {
    rowNum = 2;
  } else if (cycleCount < 160) {
    rowNum = 3;
  } else if (cycleCount < 200) {
    rowNum = 4;
  } else {
    rowNum = 5;
  }

  if (
    x === cycleCount - 40 * rowNum ||
    x - 1 === cycleCount - 40 * rowNum ||
    x + 1 === cycleCount - 40 * rowNum
  ) {
    output[rowNum].push("#");
  } else {
    output[rowNum].push(".");
  }
};

for (const line of allLines) {
  //split out the input into the command and the number
  let [command, num] = line.split(" ");

  if (command === "noop") {
    //just increment the cycle count
    cycleCount++;
    cycleComplete();
  } else if (command === "addx") {
    //we only have to parse the number on addx commands
    num = parseInt(num);

    //increment the cycle count
    cycleCount++;
    // check to see if our *first* cycle increment triggered one of the special
    //intervals where we add use X and the cycle number to calculate signal strength
    cycleComplete();

    //increment the cycle count for the second time
    cycleCount++;
    //add our number which only happens at the end of the second cycle
    x += num;

    //check to tsee if the *second* cycle is one of our special ones, if it is
    //calculate signal strength
    cycleComplete();
  }
}

for (let row of output) {
  console.log(row.join(""));
}
