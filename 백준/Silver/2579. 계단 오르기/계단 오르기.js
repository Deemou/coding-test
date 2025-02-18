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
  const stairs = [0].concat(Array.from({ length: n }, () => Number(input())));
  const dp = [0, stairs[1], stairs[1] + stairs[2]];

  for (let i = 3; i <= n; i++) {
    dp[i] = Math.max(
      dp[i - 2] + stairs[i],
      dp[i - 3] + stairs[i - 1] + stairs[i]
    );
  }

  return dp[n];
}
