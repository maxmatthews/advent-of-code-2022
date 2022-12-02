const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");
const allLines = fileContents.split(/\r?\n/);

let score = 0;
for (const line of allLines) {
  const moveArr = line.split(" ");
  const theirMove = moveArr[0];
  const myMove = moveArr[1];

  if (myMove === "X") {
    //rock
    score += 1;

    if (theirMove === "A") {
      //rock, draw
      score += 3;
    } else if (theirMove === "B") {
      //paper, lose
    } else if (theirMove === "C") {
      //scissors, win
      score += 6;
    }
  } else if (myMove === "Y") {
    //paper
    score += 2;

    if (theirMove === "A") {
      //rock, win
      score += 6;
    } else if (theirMove === "B") {
      //paper, draw
      score += 3;
    } else if (theirMove === "C") {
      //scissors, lose
    }
  } else if (myMove === "Z") {
    //scissors
    score += 3;

    if (theirMove === "A") {
      //rock, lose
    } else if (theirMove === "B") {
      //paper, win
      score += 6;
    } else if (theirMove === "C") {
      //scissors, draw
      score += 3;
    }
  }
}

console.log(score);
