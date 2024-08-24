const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const readline = require("readline");
let line = 0;
const lines = [];
const input = () => lines[line++];

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    lines.push(line);
  }).on("close", () => {
    console.log(solution());
    process.exit();
  });
}

readFile(filePath);

function solution() {
  const n = Number(input());
  const nums = input().split(" ").map(Number);
  const allCombs = new Set();
  const max = 100000 * 20;

  for (let i = 1; i <= n; i++) {
    const combs = getCombinations(nums, i);
    combs.forEach((comb) => {
      const sum = comb.reduce((acc, cur) => acc + cur, 0);
      allCombs.add(sum);
    });
  }

  for (let i = 1; i <= max; i++) {
    if (allCombs.has(i)) continue;
    return i;
  }
}

function getCombinations(arr, length) {
  if (length === 1) return arr.map((v) => [v]);

  const results = [];
  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const comb = getCombinations(rest, length - 1);
    const arranged = comb.map((v) => [fixed, ...v]);
    results.push(...arranged);
  });

  return results;
}
