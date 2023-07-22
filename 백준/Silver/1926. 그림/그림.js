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
  const [n, m] = input.shift();
  const visited = Array.from(Array(n), () => Array(m).fill(false));
  const dx = [0, -1, 0, 1];
  const dy = [1, 0, -1, 0];
  let numberOfPaintings = 0;
  let maxSize = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!visited[i][j] && input[i][j]) {
        visited[i][j] = true;
        numberOfPaintings++;
        const size = bfs(i, j);
        maxSize = Math.max(maxSize, size);
      }
    }
  }

  function bfs(x, y) {
    let cnt = 1;
    const queue = [[x, y]];
    while (queue.length) {
      const [cx, cy] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];

        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
        if (visited[nx][ny]) continue;
        if (!input[nx][ny]) continue;

        visited[nx][ny] = true;
        cnt++;
        queue.push([nx, ny]);
      }
    }
    return cnt;
  }

  console.log(numberOfPaintings);
  console.log(maxSize);
}

solution();
