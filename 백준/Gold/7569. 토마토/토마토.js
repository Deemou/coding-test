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
  const [m, n, h] = input().split(" ").map(Number);
  const board = Array.from({ length: h }).map(() => Array.from({ length: n }));
  const visit = Array.from({ length: h }).map(() =>
    Array.from({ length: n }).map(() => Array.from({ length: m }))
  );

  const dr = [0, -1, 0, 1];
  const dc = [1, 0, -1, 0];
  const dz = [1, -1];

  for (let z = 0; z < h; z++) {
    for (let r = 0; r < n; r++) {
      const row = input().split(" ").map(Number);
      board[z][r] = row;
    }
  }

  const queue = [];
  let front = 0;

  for (let z = 0; z < h; z++) {
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        if (board[z][r][c] !== 1) continue;
        visit[z][r][c] = true;
        queue.push([z, r, c, 0]);
      }
    }
  }

  let ans = 0;

  while (queue.length !== front) {
    const [z, r, c, cnt] = queue[front];
    ans = Math.max(ans, cnt);
    front++;

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];
      if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
      if (visit[z][nr][nc]) continue;
      if (board[z][nr][nc] !== 0) continue;
      visit[z][nr][nc] = true;
      board[z][nr][nc] = 1;
      queue.push([z, nr, nc, cnt + 1]);
    }

    for (let i = 0; i < 2; i++) {
      const nz = z + dz[i];
      if (nz < 0 || nz >= h) continue;
      if (visit[nz][r][c]) continue;
      if (board[nz][r][c] !== 0) continue;
      visit[nz][r][c] = true;
      board[nz][r][c] = 1;
      queue.push([nz, r, c, cnt + 1]);
    }
  }

  for (let z = 0; z < h; z++) {
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        if (board[z][r][c] !== 0) continue;
        console.log(-1);
        return;
      }
    }
  }

  console.log(ans);
}
