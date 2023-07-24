function solution() {
  const fs = require("fs");
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "./example.txt";
  const input = fs.readFileSync(filePath).toString().trim().split("\n");
  const n = +input.shift();
  const dx = [0, -1, 0, 1];
  const dy = [1, 0, -1, 0];
  const visited = Array.from({ length: n }).map(() =>
    Array.from({ length: n }).fill(false)
  );
  const ans = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (input[i][j] === "0" || visited[i][j]) continue;
      visited[i][j] = true;
      const size = bfs(i, j);
      ans.push(size);
    }
  }

  console.log(ans.length);
  console.log(
    ans
      .sort((a, b) => a - b)
      .map((v) => v + "\n")
      .join("")
  );

  function bfs(x, y) {
    const queue = [[x, y]];
    let cnt = 1;
    while (queue.length) {
      const [cx, cy] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];
        if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
        if (visited[nx][ny]) continue;
        if (input[nx][ny] === "0") continue;
        visited[nx][ny] = true;
        cnt++;
        queue.push([nx, ny]);
      }
    }
    return cnt;
  }
}

solution();
