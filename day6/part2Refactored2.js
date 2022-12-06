//add a timer to see how fast this is compared to my original solution
console.time("efficency checker");

const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");

let lookAheadLength = 14; //make this a variable so we can adjust it if needed

//loop through each letter
for (let i = 0; i < fileContents.length; i++) {
  //messy, but wanted to push myself for a one line solution:
  //slice out the start letter and 13 more, de-duplicate the letters, and
  //if there are still ${lookAheadLength=14} letters left, they must
  //all be unique so log out the current index + the next ${lookAheadLength}
  //letters to output the number of letters we processed
  if (
    [...new Set(fileContents.substring(i, i + lookAheadLength))].length ===
    lookAheadLength
  ) {
    console.log(i + lookAheadLength);
    break;
  }
}

console.timeEnd("efficency checker");
