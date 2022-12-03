const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");
const allLines = fileContents.split(/\r?\n/);

let prioritySum = 0;

for (const line of allLines) {
  const halfwayIndex = line.length / 2;
  //split the leftHalf into an array so it's easier to iterate over
  const leftHalf = line.substring(0, halfwayIndex).split("");
  const rightHalf = line.substring(halfwayIndex);

  //use each letter in the left half of the string to see if the right half
  //includes that letter, then store the letter that matches
  const matchingLetter = leftHalf.find((letter) => rightHalf.includes(letter));

  //this if statement could be written as a inline tenerary to determine the
  //num to subtract, but I think the code is easier to read by leaving it as
  //an if statement
  if (matchingLetter === matchingLetter.toUpperCase()) {
    //matching letter is uppercase
    //A is char code 65, so subtracting 65 from the letters uppercase char code
    //then adding 27 to factor in that lowercase letters get higher priority numbers
    //gives us the matching priority number from the challenge
    prioritySum += matchingLetter.charCodeAt(0) - 65 + 27;
  } else {
    //matching letter i lowercase
    //a is char code 97, so subtracting 96 from the letters lowercase char code
    //gives us the matching priority number from the challenge
    prioritySum += matchingLetter.charCodeAt(0) - 96;
  }
}
console.log(prioritySum);
