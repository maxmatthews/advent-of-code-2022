const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");
const allLines = fileContents.split(/\r?\n/);

let prioritySum = 0;

//loop over each group of elves by incrementing by three each loop run
//the index representing the first elf number in each group
for (let elfIndex = 0; elfIndex < allLines.length; elfIndex += 3) {
  //split the firstElf into an array so it's easier to iterate over
  const firstElf = allLines[elfIndex].split("");
  const secondElf = allLines[elfIndex + 1];
  const thirdElf = allLines[elfIndex + 2];

  //use each letter in the of firstElf to see if it's included in
  //the second AND third elfs string
  const matchingLetter = firstElf.find(
    (letter) => secondElf.includes(letter) && thirdElf.includes(letter)
  );

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
