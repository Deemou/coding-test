const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const readline = require("readline");
let line = 0;
let stdin = [];
const input = () => stdin[line++];

readFile(filePath);

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    stdin.push(line);
  }).on("close", () => {
    console.log(solution());
    process.exit();
  });
}

function solution() {
  const [M, N] = input().split(" ").map(Number);
  const board = [];
  const ways = Array(M)
    .fill()
    .map(() => Array(N).fill(-1));
  for (let i = 0; i < M; i++) {
    board.push(input().split(" ").map(Number));
  }
  const dx = [0, -1, 0, 1];
  const dy = [1, 0, -1, 0];

  function dfs(x, y) {
    if (x === M - 1 && y === N - 1) return 1;
    if (ways[x][y] !== -1) return ways[x][y];

    ways[x][y] = 0;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= M || ny < 0 || ny >= N) continue;
      if (board[nx][ny] >= board[x][y]) continue;

      ways[x][y] += dfs(nx, ny);
    }

    return ways[x][y];
  }

  return dfs(0, 0);
}
