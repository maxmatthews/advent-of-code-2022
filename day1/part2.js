const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");
const allLines = fileContents.split(/\r?\n/);

let elfTotals = [0];

for (const line of allLines) {
  if (line) {
    elfTotals[elfTotals.length - 1] += parseInt(line);
  } else {
    elfTotals.push(0);
  }
}
// console.log(elfTotals);
const sortedTotals = elfTotals.sort((a, b) => {
  return b - a;
});
console.log(sortedTotals[0] + sortedTotals[1] + sortedTotals[2]);
