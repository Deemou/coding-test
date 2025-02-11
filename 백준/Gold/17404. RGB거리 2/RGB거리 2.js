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
  const costs = Array.from({ length: n }, () => input().split(" ").map(Number));
  let answer = Infinity;

  for (let firstColor = 0; firstColor < 3; firstColor++) {
    const dp = Array.from({ length: n }, () => Array(3).fill(Infinity));
    dp[0][firstColor] = costs[0][firstColor];

    for (let i = 1; i < n; i++) {
      dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + costs[i][0];
      dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + costs[i][1];
      dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + costs[i][2];
    }

    for (let lastColor = 0; lastColor < 3; lastColor++) {
      if (lastColor === firstColor) continue;
      answer = Math.min(answer, dp[n - 1][lastColor]);
    }
  }

  return answer;
}
