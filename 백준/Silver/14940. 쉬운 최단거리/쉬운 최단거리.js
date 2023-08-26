const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const readline = require("readline");
let line = 0;
let stdin = [];
const input = () => stdin[line++];

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    stdin.push(line);
  }).on("close", () => {
    solution();
    process.exit();
  });
}

readFile(filePath);

function solution() {
  const [n, m] = input().split(" ").map(Number);
  const board = [];

  let start;

  const dist = Array.from({ length: n }, () =>
    Array.from({ length: m }).fill(-1)
  );

  for (let i = 0; i < n; i++) {
    const row = input().split(" ").map(Number);
    board.push(row);
    for (let j = 0; j < m; j++) {
      if (board[i][j] === 2) {
        start = [i, j];
        dist[i][j] = 0;
      }
      if (board[i][j] === 0) dist[i][j] = 0;
    }
  }

  let dx = [0, -1, 0, 1];
  let dy = [1, 0, -1, 0];
  let queue = [];
  queue.push(start);
  let front = 0;

  while (queue.length !== front) {
    let [x, y] = queue[front];
    front++;

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
      if (dist[nx][ny] !== -1) continue;
      if (board[nx][ny] !== 1) continue;

      dist[nx][ny] = dist[x][y] + 1;
      queue.push([nx, ny]);
    }
  }

  for (let i = 0; i < n; i++) {
    console.log(dist[i].join(" "));
  }
}
