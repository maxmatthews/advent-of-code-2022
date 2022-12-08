const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");
const allLines = fileContents.split(/\r?\n/);

let treeGrid = [];

//loop over the input and store the parsed numbers in a multi-dimensional array
//to make it use a coordinate system
for (let row of allLines) {
  let col = [];
  for (let i = 0; i < row.length; i++) {
    col.push(parseInt(row[i]));
  }
  treeGrid.push(col);
}

//start the visibility score as low as it can go
let highestVisibilityScore = 0;

//loop over all the rows
for (let rowNum = 0; rowNum < treeGrid.length; rowNum++) {
  const row = treeGrid[rowNum];

  //loop over all the cols
  for (let colNum = 0; colNum < row.length; colNum++) {
    const currentTree = row[colNum];

    //top
    let topCounter = 0;
    //loop over all the trees above this one in the same col
    //every tree that we touch going up add one to the count
    //until we find a tree that's taller or equal, still count
    //it but then stop counting in that direction, and move onto
    //the next direction
    for (let i = rowNum - 1; i >= 0; i--) {
      topCounter++;
      if (treeGrid[i][colNum] >= currentTree) {
        break;
      }
    }

    //bottom
    let bottomCounter = 0;
    for (let i = rowNum + 1; i < treeGrid.length; i++) {
      bottomCounter++;
      if (treeGrid[i][colNum] >= currentTree) {
        break;
      }
    }

    //left
    let leftCounter = 0;
    for (let i = colNum - 1; i >= 0; i--) {
      leftCounter++;
      if (treeGrid[rowNum][i] >= currentTree) {
        break;
      }
    }

    //right
    let rightCounter = 0;
    for (let i = colNum + 1; i < row.length; i++) {
      rightCounter++;
      if (treeGrid[rowNum][i] >= currentTree) {
        break;
      }
    }

    //once we check all four directions, multiply the score together
    const thisTreesScore =
      topCounter * bottomCounter * leftCounter * rightCounter;

    //if this trees score is bigger than our last highest tree score,
    //set this tree's score to the newest highest
    if (highestVisibilityScore < thisTreesScore) {
      highestVisibilityScore = thisTreesScore;
    }
  }
}

console.log(highestVisibilityScore);
