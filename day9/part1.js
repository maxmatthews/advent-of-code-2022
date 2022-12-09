const fs = require("fs");
//thanks to a suggestion from Mike Vormwald you can swap these two lines
//to make sure your expected output lines up with the example input
const fileContents = fs.readFileSync("./input.txt", "utf-8");
// const fileContents = fs.readFileSync("./exampleInput.txt", "utf-8");
const allLines = fileContents.split(/\r?\n/);

// TODO: Add more comments explaining this code. Too excited to get to P2 A.T.M.

let headX = 0,
  headY = 0,
  tailX = 0,
  tailY = 0;

let lastHeadX, lastHeadY;

//head and tail start out at 0,0
let tailVisitedLocations = [[0, 0]];

const moveHead = (direction) => {
  lastHeadX = headX;
  lastHeadY = headY;
  //I normally prefer if/else if but in the interest of
  //doing something new, I thought I'd try a switch for once
  switch (direction) {
    case "U":
      headY++;
      break;
    case "D":
      headY--;
      break;
    case "L":
      headX--;
      break;
    case "R":
      headX++;
  }
};

const checkAndMoveTail = (direction) => {
  if (Math.abs(tailX - headX) <= 1 && Math.abs(tailY - headY) <= 1) {
    //head & tail are within one of each other, no need to move it.
  } else {
    tailX = lastHeadX;
    tailY = lastHeadY;

    const hasBeenHereAlready = tailVisitedLocations.find((location) => {
      return location[0] === tailX && location[1] === tailY;
    });

    if (!hasBeenHereAlready) {
      tailVisitedLocations.push([tailX, tailY]);
    }
  }
};

const movePrinter = () => {
  let xDim = Math.max(tailX, headX);
  let yDim = Math.max(tailY, headY);

  for (let y = yDim; y >= 0; y--) {
    let toPrint = "";
    for (let x = 0; x <= xDim; x++) {
      if (headX === x && headY === y) {
        toPrint += "H";
      } else if (tailX === x && tailY === y) {
        toPrint += "T";
      } else {
        toPrint += ".";
      }
    }
    console.log(toPrint);
  }
  console.log("-------");
};

let lineCounter = 0;
stop: for (const line of allLines) {
  lineCounter++;
  const [direction, strNumMoves] = line.split(" ");
  const numMoves = parseInt(strNumMoves);
  console.log(direction, numMoves);
  for (let i = 0; i < numMoves; i++) {
    moveHead(direction);
    checkAndMoveTail(direction);
    // movePrinter();
  }
  // if (lineCounter === 2) {
  //   break stop;
  // }
}

console.log(tailVisitedLocations.length);
