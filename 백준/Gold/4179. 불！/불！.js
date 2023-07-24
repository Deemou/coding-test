function solution() {
  const fs = require("fs");
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "./example.txt";
  const input = fs.readFileSync(filePath).toString().trim().split("\n");
  const [r, c] = input.shift().split(" ").map(Number);
  const dx = [0, -1, 0, 1];
  const dy = [1, 0, -1, 0];
  const burned = Array.from({ length: r }).map(() =>
    Array.from({ length: c }).fill(0)
  );
  const visited = Array.from({ length: r }).map(() =>
    Array.from({ length: c }).fill(false)
  );
  let J = [];
  let F = [];
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (input[i][j] === "J") {
        visited[i][j] = true;
        J.push([i, j, 0]);
      } else if (input[i][j] === "F") F.push([i, j]);
    }
  }
  bfsF(F);
  const ans = bfsJ(J);
  console.log(ans);

  function bfsF(queue) {
    while (queue.length) {
      const [cx, cy] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];
        if (nx < 0 || nx >= r || ny < 0 || ny >= c) continue;
        if (["F", "#"].includes(input[nx][ny])) continue;
        if (burned[nx][ny]) continue;
        burned[nx][ny] = burned[cx][cy] + 1;
        queue.push([nx, ny]);
      }
    }
  }
  function bfsJ(queue) {
    while (queue.length) {
      const [cx, cy, cnt] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];
        if (nx < 0 || nx >= r || ny < 0 || ny >= c) return cnt + 1;
        if (["F", "#"].includes(input[nx][ny])) continue;
        if (burned[nx][ny] && burned[nx][ny] <= cnt + 1) continue;
        if (visited[nx][ny]) continue;
        visited[nx][ny] = true;
        queue.push([nx, ny, cnt + 1]);
      }
    }
    return "IMPOSSIBLE";
  }
}

solution();
