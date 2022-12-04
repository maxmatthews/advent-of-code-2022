const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");
const allLines = fileContents.split(/\r?\n/);

let overlapCounter = 0;

for (const line of allLines) {
  //input: a-b,x-y
  const range1 = line.split(",")[0]; //a-b
  const range2 = line.split(",")[1]; //x-y

  const num1 = parseInt(range1.split("-")[0]); //a
  const num2 = parseInt(range1.split("-")[1]); //b

  const num3 = parseInt(range2.split("-")[0]); //c
  const num4 = parseInt(range2.split("-")[1]); //d

  if (num1 >= num3 && num2 <= num4) {
    //first range is covered by second range
    overlapCounter++;
  } else if (num3 >= num1 && num4 <= num2) {
    //second range is covered by first range
    overlapCounter++;
  }
}

console.log(overlapCounter);
