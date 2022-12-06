//add a timer to see how fast this is compared to my original solution
console.time("efficency checker");

const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");

let lookAheadLength = 14; //make this a variable so we can adjust it if needed

//loop over every letter in the input
letterLoop: for (let i = 0; i < fileContents.length; i++) {
  //build an array with the current letter and the next ${lookAheadLength=14} letters
  let letters = [];

  //push the current letter and 13 more into the array
  for (let lookAhead = i; lookAhead < i + lookAheadLength; lookAhead++) {
    if (letters.includes(fileContents[lookAhead])) {
      //if the current lookAhead letter is already in the array, it must be
      //a duplicate letter, so move onto the next starting letter in the
      //outer loop
      continue letterLoop;
    } else {
      //the letter doesn't exist yet, so push it into the array so we can check
      //the next letter against it
      letters.push(fileContents[lookAhead]);
    }
  }

  //this won't run unless it gets through all 14 of the lookAhead letters due to the
  //continue in that loop, if it does, we found our 14 unique characters and can stop
  //the outer loop
  console.log(i + lookAheadLength);
  break;
}

//this is a millisecond faster than my initial solution
console.timeEnd("efficency checker");
