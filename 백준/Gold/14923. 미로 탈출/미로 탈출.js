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
  const [n, m] = input[0];
  const [hx, hy] = input[1];
  const [ex, ey] = input[2];
  const board = [...input.slice(3)];
  const dist = Array.from({ length: n }).map(() =>
    Array.from({ length: m }).map(() => Array.from({ length: 2 }))
  );

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  return bfs(hx - 1, hy - 1);

  function bfs(x, y) {
    const queue = [[x, y, 0]];
    dist[x][y][0] = 1;
    let front = 0;
    while (queue.length !== front) {
      const [cx, cy, w] = queue[front];
      front++;
      if (cx === ex - 1 && cy === ey - 1) {
        return dist[cx][cy][w];
      }
      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];
        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
        if (dist[nx][ny][w]) continue;
        if (w === 0) {
          if (board[nx][ny] === 1) {
            dist[nx][ny][1] = dist[cx][cy][0];
            queue.push([nx, ny, 1]);
          } else {
            dist[nx][ny][w] = dist[cx][cy][w] + 1;
            queue.push([nx, ny, w]);
          }
        } else {
          if (board[nx][ny] === 1) continue;
          dist[nx][ny][w] = dist[cx][cy][w] + 1;
          queue.push([nx, ny, w]);
        }
      }
    }
    return -1;
  }
}

console.log(solution());
