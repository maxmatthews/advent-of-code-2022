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
console.log(Math.max(...elfTotals));
