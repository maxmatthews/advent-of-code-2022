//add a timer to see how fast this is compared to my original solution
console.time("efficency checker");

const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");

let lookAheadLength = 14; //make this a variable so we can adjust it if needed

//loop over every letter in the input
for (let i = 0; i < fileContents.length; i++) {
  //build an array with the current letter and the next ${lookAheadLength=14} letters
  let letters = [];

  //push the current letter and 13 more into the array
  for (let lookAhead = i; lookAhead < i + lookAheadLength; lookAhead++) {
    if (letters.includes(fileContents[lookAhead])) {
      continue;
    } else {
      letters.push(fileContents[lookAhead]);
    }
  }
  if (letters.length === lookAheadLength) {
    console.log(i + lookAheadLength);
    break;
  }
}

//this is a millisecond faster than my initial solution
console.timeEnd("efficency checker");
