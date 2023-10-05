const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const readline = require("readline");
let line = 0;
let stdin = [];
const input = () => stdin[line++];

readFile(filePath);

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    stdin.push(line);
  }).on("close", () => {
    console.log(solution());
    process.exit();
  });
}

function solution() {
  const n = +input();
  const positiveNums = [];
  const negativeNums = [];
  let sum = (zeroCount = oneCount = 0);

  for (let i = 0; i < n; i++) {
    const num = +input();
    if (num < 0) negativeNums.push(num);
    else if (num > 1) positiveNums.push(num);
    else if (num === 0) zeroCount++;
    else oneCount++;
  }

  positiveNums.sort((a, b) => a - b);
  negativeNums.sort((a, b) => b - a);

  sum += oneCount;

  while (positiveNums.length >= 2) {
    sum += positiveNums.pop() * positiveNums.pop();
  }

  if (positiveNums.length === 1) {
    sum += positiveNums[0];
  }

  while (negativeNums.length >= 2) {
    sum += negativeNums.pop() * negativeNums.pop();
  }

  if (negativeNums.length === 1 && zeroCount > 0) {
    negativeNums.pop();
  }

  if (negativeNums.length === 1) {
    sum += negativeNums[0];
  }

  return sum;
}
