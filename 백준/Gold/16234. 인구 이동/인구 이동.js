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
  const [n, l, r] = input[0].map(Number);
  const visit = Array.from({ length: n }).map(() => Array.from({ length: n }));
  const population = input.slice(1);

  const dx = [0, -1, 0, 1];
  const dy = [1, 0, -1, 0];

  let ans = -1;
  let cnt = 0;
  while (cnt !== n * n) {
    ans++;
    visit.map((row) => row.fill(false));
    cnt = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (visit[i][j]) continue;
        cnt++;
        bfs(i, j);
      }
    }
  }

  return ans;

  function bfs(x, y) {
    const queue = [];
    queue.push([x, y]);
    visit[x][y] = true;
    let front = 0;
    let sum = 0;

    while (queue.length !== front) {
      const [cx, cy] = queue[front];
      front++;
      sum += population[cx][cy];

      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];
        if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
        if (visit[nx][ny]) continue;
        const diff = Math.abs(population[cx][cy] - population[nx][ny]);
        if (diff < l || diff > r) continue;
        visit[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }

    const avg = Math.floor(sum / queue.length);
    for (let i = 0; i < queue.length; i++) {
      const [x, y] = queue[i];
      population[x][y] = avg;
    }
  }
}

console.log(solution());
