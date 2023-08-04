function solution() {
  const fs = require("fs");
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "./example.txt";
  const input = fs.readFileSync(filePath).toString().trim().split("\n");
  const [n, m] = input.shift().split(" ").map(Number);
  const dx = [0, -1, 0, 1];
  const dy = [1, 0, -1, 0];
  const dist = Array.from({ length: n }).map(() =>
    Array.from({ length: m }).map(() => [0, 0])
  );
  dist[0][0][0] = 1;

  const ans = bfs(0, 0);
  console.log(ans);

  function bfs(x, y) {
    const queue = [[x, y, 0]];
    let front = 0;
    while (queue.length !== front) {
      const [cx, cy, w] = queue[front];
      front++;
      if (cx === n - 1 && cy === m - 1) return dist[cx][cy][w];
      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];
        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
        if (dist[nx][ny][w]) continue;
        if (input[nx][ny] === "0") {
          dist[nx][ny][w] = dist[cx][cy][w] + 1;
          queue.push([nx, ny, w]);
        } else {
          if(w === 1) continue;
          dist[nx][ny][1] = dist[cx][cy][0] + 1;
          queue.push([nx, ny, 1]);
        }
      }
    }
    return -1;
  }
}

solution();
