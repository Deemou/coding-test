const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
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
  const A = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);
  const B = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => b - a);

  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += A[i] * B[i];
  }

  return sum;
}
