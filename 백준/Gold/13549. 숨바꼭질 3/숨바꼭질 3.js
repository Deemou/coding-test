function solution() {
  const fs = require("fs");
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "./example.txt";
  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(" ")
    .map(Number);
  const [n, k] = input;
  const limit = 100000;
  const dist = Array.from({ length: limit + 1 }).fill(limit);
  bfs();
  console.log(dist[k]);

  function bfs() {
    const queue = [[n]];
    dist[n] = 0;
    let front = 0;

    while (queue.length !== front) {
      const [cx] = queue[front];
      front++;

      const xBack = cx - 1;
      const xNext = cx + 1;
      const xJump = cx * 2;

      if (xBack >= 0 && dist[xBack] > dist[cx]) {
        dist[xBack] = dist[cx] + 1;
        queue.push([xBack, dist[cx] + 1]);
      }
      if (cx > k) continue;
      if (xNext <= limit && dist[xNext] > dist[cx]) {
        dist[xNext] = dist[cx] + 1;
        queue.push([xNext, dist[cx] + 1]);
      }
      if (xJump <= limit && dist[xJump] > dist[cx]) {
        dist[xJump] = dist[cx];
        queue.push([xJump, dist[cx]]);
      }
    }
  }
}

solution();
