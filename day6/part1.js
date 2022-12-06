const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");

//loop over every letter in the input
for (let i = 0; i < fileContents.length; i++) {
  //build an array with the current letter and the next three letters
  const letters = [
    fileContents[i],
    fileContents[i + 1],
    fileContents[i + 2],
    fileContents[i + 3],
  ];
  //deduplicate the array using a set and spread operator
  const dedupe = [...new Set(letters)];

  //if the length is 4, the current set of 4 letters input the array must be unique
  if (dedupe.length === 4) {
    console.log(i + 4); //add 4 to the current loop to account for the letters coming after this one
    break; //stop running the loop, we found the signal marker index
  }
}
