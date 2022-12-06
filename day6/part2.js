const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");

let lookAheadLength = 14; //make this a variable so we can adjust it if needed

//loop over every letter in the input
for (let i = 0; i < fileContents.length; i++) {
  //build an array with the current letter and the next ${lookAheadLength=14} letters
  let letters = [];

  //push the current letter and 13 more into the array
  for (let lookAhead = i; lookAhead < i + lookAheadLength; lookAhead++) {
    letters.push(fileContents[lookAhead]);
  }
  //deduplicate the array using a set and spread operator
  const dedupe = [...new Set(letters)];

  //if the length is 14, the current set of 14 letters input the array must be unique
  if (dedupe.length === lookAheadLength) {
    //add ${lookAheadLength} to the current loop to account for the letters coming after this one
    console.log(i + lookAheadLength);
    break; //stop running the loop, we found the signal marker index
  }
}
