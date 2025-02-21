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
  const T = Number(input());
  const answer = [];
  for (let tc = 0; tc < T; tc++) {
    const n = Number(input());
    const stickers = Array.from({ length: 2 }, () =>
      input().split(" ").map(Number)
    );

    const dp = Array.from({ length: 2 }, () => Array(n + 1).fill(0));

    dp[0][1] = stickers[0][0];
    dp[1][1] = stickers[1][0];

    for (let i = 1; i < n; i++) {
      dp[0][i + 1] = Math.max(dp[1][i], dp[1][i - 1]) + stickers[0][i];
      dp[1][i + 1] = Math.max(dp[0][i], dp[0][i - 1]) + stickers[1][i];
    }

    answer.push(Math.max(dp[0][n], dp[1][n]));
  }

  return answer.join("\n");
}
