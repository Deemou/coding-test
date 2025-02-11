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
  const N = Number(input());
  const dp = Array.from({ length: N + 1 }, () => Array(3).fill(Infinity));
  dp[0] = [0, 0, 0];

  for (let i = 1; i <= N; i++) {
    const [r, g, b] = input().split(" ").map(Number);
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + r;
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + g;
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + b;
  }

  return Math.min(...dp[N]);
}
