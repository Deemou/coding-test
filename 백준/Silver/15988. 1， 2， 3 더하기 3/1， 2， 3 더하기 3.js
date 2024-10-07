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
  const dp = [0, 1, 2, 4];
  const DIVISOR = 1000000009;
  for (let tc = 0; tc < T; tc++) {
    const n = Number(input());
    for (let i = 4; i <= n; i++) {
      if (dp[i]) continue;
      dp[i] = (dp[i - 1] + dp[i - 2] + dp[i - 3]) % DIVISOR;
    }
    answer.push(dp[n]);
  }

  return answer.join("\n");
}
