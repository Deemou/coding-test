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
  const dist = Array.from({ length: limit + 1 });

  return bfs();

  function bfs() {
    const queue = [[n]];
    dist[n] = 0;
    let front = 0;
    while (queue.length !== front) {
      const [cx] = queue[front];
      front++;
      if (cx === k) {
        return dist[cx];
      }
      const xBack = cx - 1;
      const xNext = cx + 1;
      const xJump = 2 * cx;
      if (xBack >= 0 && !dist[xBack]) {
        dist[xBack] = dist[cx] + 1;
        queue.push([xBack]);
      }
      if (cx > k) continue;
      if (xNext <= limit && !dist[xNext]) {
        dist[xNext] = dist[cx] + 1;
        queue.push([xNext]);
      }
      if (xJump <= limit && !dist[xJump]) {
        dist[xJump] = dist[cx] + 1;
        queue.push([xJump]);
      }
    }
  }
}

console.log(solution());
