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
  const [N, M, K] = input().split(" ").map(Number);
  const kx = Math.ceil(K / M),
    ky = ((K - 1) % M) + 1;
  const dp = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));
  dp[1][0] = 1;

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      // K 우상단
      if (i < kx && j > ky) continue;
      //K 좌하단
      if (i > kx && j < ky) continue;
      dp[i][j] = dp[i][j - 1] + dp[i - 1][j];
    }
  }

  return dp[N][M];
}
