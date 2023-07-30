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
  const [k] = input.shift();
  const [m, n] = input.shift();

  const dx = [0, -1, 0, 1];
  const dy = [1, 0, -1, 0];
  const jx = [-1, -2, -2, -1, 1, 2, 2, 1];
  const jy = [2, 1, -1, -2, -2, -1, 1, 2];

  const dist = Array.from({ length: n }).map(() =>
    Array.from({ length: m }).map(() =>
      Array.from({ length: k + 1 }).fill(Infinity)
    )
  );

  return bfs(0, 0);

  function bfs(x, y) {
    const queue = [[x, y, 0]];
    dist[x][y][0] = 0;
    let front = 0;

    while (queue.length !== front) {
      const [cx, cy, jump] = queue[front];
      front++;
      if (cx === n - 1 && cy === m - 1) {
        return dist[cx][cy][jump];
      }

      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];
        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
        if (input[nx][ny] === 1) continue;
        if (dist[nx][ny][jump] !== Infinity) continue;
        dist[nx][ny][jump] = dist[cx][cy][jump] + 1;
        queue.push([nx, ny, jump]);
      }

      if (jump === k) continue;
      for (let i = 0; i < 8; i++) {
        const nx = cx + jx[i];
        const ny = cy + jy[i];
        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
        if (input[nx][ny] === 1) continue;
        if (dist[nx][ny][jump + 1] !== Infinity) continue;
        dist[nx][ny][jump + 1] = dist[cx][cy][jump] + 1;
        queue.push([nx, ny, jump + 1]);
      }
    }
    return -1;
  }
}

console.log(solution());
