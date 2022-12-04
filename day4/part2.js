const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");
const allLines = fileContents.split(/\r?\n/);

let overlapCounter = 0;

lineLoop: for (const line of allLines) {
  //input: a-b,x-y
  const range1 = line.split(",")[0]; //a-b
  const range2 = line.split(",")[1]; //x-y

  const num1 = parseInt(range1.split("-")[0]); //a
  const num2 = parseInt(range1.split("-")[1]); //b

  const num3 = parseInt(range2.split("-")[0]); //c
  const num4 = parseInt(range2.split("-")[1]); //d

  //generate array of all the numbers between num1 & num2
  let spreadOfRange1 = [];
  for (let i = num1; i <= num2; i++) {
    spreadOfRange1.push(i);
  }

  //generate array of all the numbers between num3 & num4
  let spreadOfRange2 = [];
  for (let i = num3; i <= num4; i++) {
    spreadOfRange2.push(i);
  }

  for (const num of spreadOfRange1) {
    if (spreadOfRange2.includes(num)) {
      overlapCounter++;
      continue lineLoop; //stop checking other numbers in the range, we already found overlap
    }
  }

  //this loop isn't necessary because if a number from range 1 is in range2,
  //the number in range 2 obviously must be in range1
  //   for (const num of spreadOfRange2) {
  //     if (spreadOfRange1.includes(num)) {
  //       overlapCounter++;
  //       continue lineLoop;
  //     }
  //   }
}

console.log(overlapCounter);
