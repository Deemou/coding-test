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
  const board = Array.from({ length: n }, () => input().split(" ").map(Number));
  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  const dx = [0, -1, 0, 1];
  const dy = [1, 0, -1, 0];

  let maxDays = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      maxDays = Math.max(maxDays, dfs(i, j));
    }
  }

  return maxDays;

  function dfs(x, y) {
    if (dp[x][y] !== 0) return dp[x][y];
    dp[x][y] = 1;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
      if (board[nx][ny] <= board[x][y]) continue;

      dp[x][y] = Math.max(dp[x][y], dfs(nx, ny) + 1);
    }

    return dp[x][y];
  }
}
