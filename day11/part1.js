const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");
// const fileContents = fs.readFileSync("./exampleInput.txt", "utf-8");

let monkeys = [];

const regex =
  /Monkey (\d):\n  Starting items: (.+)\n  Operation: new = old (.) (\d+|old)\n  Test: divisible by (\d+)\n.   If true: throw to monkey (\d)\n.   If false: throw to monkey (\d)/gm;
const matches = fileContents.matchAll(regex);
for (const match of matches) {
  let [
    ignore,
    monkeyNum,
    itemsStr,
    operator,
    operation,
    divisibleNum,
    trueMonkey,
    falseMonkey,
  ] = match;
  monkeys.push({
    items: itemsStr.split(", ").map((num) => parseInt(num)),
    operator,
    operation: operation === "old" ? "old" : parseInt(operation),
    divisibleNum: parseInt(divisibleNum),
    trueMonkey: parseInt(trueMonkey),
    falseMonkey: parseInt(falseMonkey),
    activityCount: 0,
  });
}

stopEverything: for (let round = 1; round <= 20; round++) {
  for (let monkey of monkeys) {
    monkey.items = monkey.items.filter((item) => {
      monkey.activityCount++;
      item = eval(
        `${item}${monkey.operator}${
          monkey.operation === "old" ? item : monkey.operation
        }`
      );

      item = Math.floor(item / 3);

      const passesTest = item % monkey.divisibleNum === 0;

      //remove the item from the current monkey and throw it
      monkeys[passesTest ? monkey.trueMonkey : monkey.falseMonkey].items.push(
        item
      );
      return false;
    });
  }

  //check round by round to make sure the input is being processed correctly
  //   if (round > 2) {
  // break;
  //   }
}

const monkeysSortedByActivity = monkeys.sort(
  (a, b) => b.activityCount - a.activityCount
);
const mostActiveMonkey = monkeysSortedByActivity[0];
const secondMostActiveMonkey = monkeysSortedByActivity[1];
const monkeyBusiness =
  mostActiveMonkey.activityCount * secondMostActiveMonkey.activityCount;

console.log(monkeyBusiness);
