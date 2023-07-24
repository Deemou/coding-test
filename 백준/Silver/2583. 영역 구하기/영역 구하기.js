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
  const [m, n, k] = input.shift();
  const dx = [0, -1, 0, 1];
  const dy = [1, 0, -1, 0];
  const ans = [];
  const visited = Array.from({ length: n }).map(() =>
    Array.from({ length: m }).fill(false)
  );
  for (let i = 0; i < k; i++) {
    const [x1, y1, x2, y2] = input[i];
    for (let r = x1; r < x2; r++) {
      for (let c = y1; c < y2; c++) {
        visited[r][c] = true;
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (visited[i][j]) continue;
      visited[i][j] = true;
      const size = bfs(i, j);
      ans.push(size);
    }
  }

  function bfs(x, y) {
    const queue = [[x, y]];
    let size = 1;
    while (queue.length) {
      const [cx, cy] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];
        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
        if (visited[nx][ny]) continue;
        visited[nx][ny] = true;
        size++;
        queue.push([nx, ny]);
      }
    }
    return size;
  }

  console.log(ans.length);
  console.log(...ans.sort((a, b) => a - b));
}

solution();
