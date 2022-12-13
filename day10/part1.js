const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");
// const fileContents = fs.readFileSync("./exampleInput.txt", "utf-8");
const allLines = fileContents.split(/\r?\n/);

//initialize variables
let x = 1;
let cycleCount = 1;
let signalStrength = 0;

//generate array of cycles we check by starting at 20 and adding 40 everytime
let cyclesToCheck = [];
for (let i = 20; i <= 220; i += 40) {
  cyclesToCheck.push(i);
}

//move this into a function because we need to check it frequently
const specialCycleCheck = () => {
  //check to see if the current cycle value is part of the array we generated
  //above to only check the cycle numbers we care about
  if (cyclesToCheck.includes(cycleCount)) {
    //if it is, calculate singal strength by muliplying X by the current cycleCount,
    //then add it to the signal strength
    signalStrength += x * cycleCount;
  }
};

for (const line of allLines) {
  //split out the input into the command and the number
  let [command, num] = line.split(" ");

  if (command === "noop") {
    //just increment the cycle count
    cycleCount++;
  } else if (command === "addx") {
    //we only have to parse the number on addx commands
    num = parseInt(num);

    //increment the cycle count
    cycleCount++;
    // check to see if our *first* cycle increment triggered one of the special
    //intervals where we add use X and the cycle number to calculate signal strength
    specialCycleCheck();

    //increment the cycle count for the second time
    cycleCount++;
    //add our number which only happens at the end of the second cycle
    x += num;

    //check to tsee if the *second* cycle is one of our special ones, if it is
    //calculate signal strength
    specialCycleCheck();
  }
}

console.log(signalStrength);
