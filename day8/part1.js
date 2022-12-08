const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");
const allLines = fileContents.split(/\r?\n/);

let treeGrid = [];
let totalTreeCount = 0; //sanity check to see how many total trees there are vs visible

//loop over the input and store the parsed numbers in a multi-dimensional array
//to make it use a coordinate system
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
  for (let colNum = 1; colNum < row.length - 1; colNum++) {
    const currentTree = row[colNum];

    //top
    //assume the tree is visible form the edge
    let visibleFromTop = true;
    //start at one tree above, go through each the trees
    for (let i = rowNum - 1; i >= 0; i--) {
      //check the tree i number above
      if (treeGrid[i][colNum] >= currentTree) {
        //the tree is the same height or bigger, blocking visibility
        //from this edge
        visibleFromTop = false;
        //break out of the top loop, we already found one blocking the
        //visibility
        break;
      }
    }
    //if we didn't break out of the loop, it must still be visible
    if (visibleFromTop) {
      //add to the visibility counter
      visibleTreeCount++;
      //skip checking visibility in the other directions, and just move
      //on to the next tree
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
    }
  }
}

console.log(visibleTreeCount);
