//import file system package from node
const fs = require("fs");
//read input.txt file (from advent input) as a string
const fileContents = fs.readFileSync("./input.txt", "utf-8");
//break apart the huge fileContents string by a new line delimiter
//and store it in an iterable array
const allLines = fileContents.split(/\r?\n/);

//for the first elf start their total count at 0
let elfTotals = [0];

for (const line of allLines) {
  //if the line has anything in it
  if (line) {
    //parse the number, then add it to the last total in the elfTotals array
    elfTotals[elfTotals.length - 1] += parseInt(line);
  } else {
    //empty line, so a new elf is coming next iteration of the loop
    //start their total out as a 0
    elfTotals.push(0);
  }
}
// console.log(elfTotals);

//use a spread operator with built in Math.max to get the larget number
//in the array
console.log(Math.max(...elfTotals));
