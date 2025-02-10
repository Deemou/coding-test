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
    const N = Number(input());
    const coins = input().split(" ").map(Number);
    const M = Number(input());
    const dp = Array(M + 1).fill(0);
    // dp[i] = 금액 i를 만들 수 있는 경우의 수
    dp[0] = 1;
    for (let i = 0; i < N; i++) {
      const coin = coins[i];
      for (let j = coin; j <= M; j++) {
        dp[j] += dp[j - coin];
      }
    }
    answer.push(dp[M]);
  }

  return answer.join("\n");
}
