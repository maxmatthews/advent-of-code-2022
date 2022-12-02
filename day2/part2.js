const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");
const allLines = fileContents.split(/\r?\n/);

let score = 0;
for (const line of allLines) {
  const moveArr = line.split(" ");
  const theirMove = moveArr[0];
  const outcome = moveArr[1];

  if (outcome === "X") {
    //lose
    if (theirMove == "A") {
      //rock
      score += 3; //scissors
    } else if (theirMove == "B") {
      //paper
      score += 1; //rock
    } else if (theirMove == "C") {
      //scissors
      score += 2; //paper
    }
  } else if (outcome === "Y") {
    //draw
    score += 3;
    if (theirMove == "A") {
      //rock
      score += 1; //rock
    } else if (theirMove == "B") {
      //paper
      score += 2; //paper
    } else if (theirMove == "C") {
      //scissors
      score += 3; //scissors
    }
  } else if (outcome === "Z") {
    //win
    score += 6;
    if (theirMove == "A") {
      //rock
      score += 2; //paper
    } else if (theirMove == "B") {
      //paper
      score += 3; //scissors
    } else if (theirMove == "C") {
      //scissors
      score += 1; //rock
    }
  }
}

console.log(score);
