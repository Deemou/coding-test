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
    const queue = [[n, 0]];
    dist[n] = 0;
    let front = 0;

    while (queue.length !== front) {
      const [cx, cnt] = queue[front];
      front++;

      const xBack = cx - 1;
      const xNext = cx + 1;
      const xJump = cx * 2;
      if (xBack >= 0 && dist[xBack] > cnt) {
        dist[xBack] = cnt + 1;
        queue.push([xBack, cnt + 1]);
      }
      if (cx > k) continue;
      if (xNext <= limit && dist[xNext] > cnt) {
        dist[xNext] = cnt + 1;
        queue.push([xNext, cnt + 1]);
      }
      if (xJump <= limit && dist[xJump] > cnt) {
        dist[xJump] = cnt;
        queue.push([xJump, cnt]);
      }
    }
  }
}

solution();
