function solution() {
  const fs = require("fs");
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "./example.txt";
  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split("\n")
    .map((v) => v.split(" ").map(Number));
  const [m, n] = input.shift();
  const dx = [0, -1, 0, 1];
  const dy = [1, 0, -1, 0];
  const queue = [];
  let ans = 0;
  let zeroCnt = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (input[i][j] === 1) queue.push([i, j, 0]);
      else if (input[i][j] === 0) zeroCnt++;
    }
  }

  let idx = 0;
  while (queue.length !== idx) {
    const [cx, cy, cnt] = queue[idx];
    idx++;
    ans = cnt;

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (input[nx][ny]) continue;

      input[nx][ny] = 1;
      zeroCnt--;
      queue.push([nx, ny, cnt + 1]);
    }
  }

  console.log(zeroCnt ? -1 : ans);
}

solution();
