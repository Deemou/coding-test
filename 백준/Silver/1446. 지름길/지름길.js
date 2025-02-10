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
  const [N, D] = input().split(" ").map(Number);
  const dp = Array(D + 1).fill(D);
  dp[0] = 0;
  const graph = Array.from({ length: D + 1 }, () => []);

  for (let i = 0; i < N; i++) {
    const [start, end, dist] = input().split(" ").map(Number);
    if (end <= D) graph[start].push([end, dist]);
  }

  for (let i = 0; i <= D; i++) {
    if (i > 0) dp[i] = Math.min(dp[i], dp[i - 1] + 1);

    for (const [end, dist] of graph[i]) {
      dp[end] = Math.min(dp[end], dp[i] + dist);
    }
  }

  return dp[D];
}
