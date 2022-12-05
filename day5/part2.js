//Certain code is "hardcoded" in this challenge: the number of cols,
//number of spaces between each letter, and the height of the cols,
//however the input itself is still dynamically loaded into the arrays

const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");
const allLines = fileContents.split(/\r?\n/);

//set up an object with the keys of each col num and the value as an
//empty array to store the contents of the col
let arrays = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
};

//start at the bottom of the stack right above the col numbers and go
//all the way to the top of the input file
for (let rowI = 7; rowI >= 0; rowI--) {
  let colNum = 1; //keep track of what col number we are on as
  //we increment by 4 to jump to the next letter

  //loop over each col starting at the first letter, then jumping up by
  //4 to get to the next letter in the next col
  for (let colI = 1; colI < allLines[rowI].length; colI += 4) {
    //substring to get the letter
    const colValue = allLines[rowI].substring(colI, colI + 1);

    //check to see if a letter is there, if not we made it to the top
    //of that col already
    if (colValue !== " ") {
      //if there is a letter there push it into the appropriate colNum
      arrays[colNum].push(colValue);
    }
    colNum++; //manually increment as our loop increments by more than 1
  }
}

//start at line 10 (where our move commands start) and run to the end of all
//the lines
for (let i = 10; i < allLines.length; i++) {
  const lineContents = allLines[i]; //store the string from that line
  //use array destructring along with a regex that matches any digits (including
  //consecutive digits to handle multi digit numbers) to extract the important
  //parts of the command
  let [numToMove, fromColNum, toColNum] = lineContents.match(/\d+/g);
  numToMove = parseInt(numToMove);

  //splice removes items from the fromCol array and by multiplying by
  //negative one, tells it to remove items from the end instead of
  //the beginning
  const removed = arrays[fromColNum].splice(numToMove * -1, numToMove);
  //merge the removed items into the toCol array using spread operators
  arrays[toColNum] = [...arrays[toColNum], ...removed];
}

//all col moves are done, but we still need to know what's the top item in each
//col

let output = ""; //create an empty string to store our output

//loop over all 9 cols
for (let i = 1; i <= 9; i++) {
  //store the last item (ie the top of the col) in our string
  output += arrays[i][arrays[i].length - 1];
}

console.log(output);
