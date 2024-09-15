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
  const left = input().split(" ").map(Number);
  const right = input().split(" ").map(Number);

  return maxScore(N, left, right);
}

function maxScore(N, left, right) {
  const dp = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));
  // dp[i][j] = 왼쪽 더미 하단 i장, 오른쪽 더미 하단 j장을 가지고 만들 수 있는 최대 점수

  for (let i = N - 1; i >= 0; i--) {
    for (let j = N - 1; j >= 0; j--) {
      dp[i][j] = Math.max(dp[i + 1][j], dp[i + 1][j + 1]);
      if (right[j] < left[i])
        dp[i][j] = Math.max(dp[i][j], dp[i][j + 1] + right[j]);
    }
  }

  return dp[0][0];
}
