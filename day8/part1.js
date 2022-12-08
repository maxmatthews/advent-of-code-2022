const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");
const allLines = fileContents.split(/\r?\n/);

let treeGrid = [];
let totalTreeCount = 0; //sanity check to see how many total trees there are vs visible
//loop over the input and store it in a multidemonsial array with each
//height as a parsed number
for (let row of allLines) {
  let col = [];
  for (let i = 0; i < row.length; i++) {
    col.push(parseInt(row[i]));
    totalTreeCount++;
  }
  treeGrid.push(col);
}

//start the tree count by calculating the perimeter of the input then
//subtracting four for the corners that get double counted
let visibleTreeCount = (treeGrid[0].length + treeGrid.length) * 2 - 4;

console.log(visibleTreeCount);

//loop over all the rows except the first and last ones
for (let rowNum = 1; rowNum < treeGrid.length - 1; rowNum++) {
  const row = treeGrid[rowNum];

  //loop over all the cols except the first and last ones
  nextTree: for (let colNum = 1; colNum < row.length - 1; colNum++) {
    const currentTree = row[colNum];

    //top
    let visibleFromTop = true;
    for (let i = rowNum - 1; i >= 0; i--) {
      if (treeGrid[i][colNum] >= currentTree) {
        visibleFromTop = false;
        break;
      }
    }
    if (visibleFromTop) {
      visibleTreeCount++;
      continue;
    }

    //bottom
    let visibleFromBottom = true;
    for (let i = rowNum + 1; i < treeGrid.length; i++) {
      if (treeGrid[i][colNum] >= currentTree) {
        visibleFromBottom = false;
        break;
      }
    }
    if (visibleFromBottom) {
      visibleTreeCount++;
      continue;
    }

    //left
    let visibleFromLeft = true;
    for (let i = colNum - 1; i >= 0; i--) {
      if (treeGrid[rowNum][i] >= currentTree) {
        visibleFromLeft = false;
        break;
      }
    }
    if (visibleFromLeft) {
      visibleTreeCount++;
      continue;
    }

    //right
    let visibleFromRight = true;
    for (let i = colNum + 1; i < row.length; i++) {
      if (treeGrid[rowNum][i] >= currentTree) {
        visibleFromRight = false;
        break;
      }
    }
    if (visibleFromRight) {
      visibleTreeCount++;
      continue;
    }
  }
}

console.log(visibleTreeCount);
