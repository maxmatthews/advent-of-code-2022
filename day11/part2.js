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
    items: itemsStr.split(", ").map((num) => BigInt(num)),
    operator,
    operation: operation === "old" ? "old" : parseInt(operation),
    divisibleNum: parseInt(divisibleNum),
    trueMonkey: parseInt(trueMonkey),
    falseMonkey: parseInt(falseMonkey),
    activityCount: 0,
  });
}

//Code credit: https://github.com/mariom100o/Advent-of-Code-Solutions/blob/main/2022/day11/part2.js
//Reddit thread: https://www.reddit.com/r/adventofcode/comments/zih7gf/2022_day_11_part_2_what_does_it_mean_find_another/
//Hello? I was just subjected to do math without consent and would like to file a police report…
const leastCommonDenominator = monkeys.reduce((acc, monkey) => {
  return acc * monkey.divisibleNum;
}, 1);

console.log(leastCommonDenominator);

stopEverything: for (let round = 1; round <= 10000; round++) {
  for (let monkey of monkeys) {
    monkey.items = monkey.items.filter((item) => {
      monkey.activityCount++;
      item = eval(
        `${item}${monkey.operator}${
          monkey.operation === "old" ? item : monkey.operation
        }`
      );

      item %= leastCommonDenominator;

      const passesTest = item % monkey.divisibleNum === 0;

      //remove the item from the current monkey and throw it
      monkeys[passesTest ? monkey.trueMonkey : monkey.falseMonkey].items.push(
        item
      );
      return false;
    });
  }
  //check round by round to make sure the input is being processed correctly
}

// console.log(monkeys.map((monkey) => monkey.activityCount));

const monkeysSortedByActivity = monkeys.sort(
  (a, b) => b.activityCount - a.activityCount
);
const mostActiveMonkey = monkeysSortedByActivity[0];
const secondMostActiveMonkey = monkeysSortedByActivity[1];
const monkeyBusiness =
  mostActiveMonkey.activityCount * secondMostActiveMonkey.activityCount;

console.log(monkeyBusiness);
