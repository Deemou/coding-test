function solution() {
  const fs = require("fs");
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "./example.txt";
  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split("\n")
    .map((v) => v.replace("\r", ""));
  const [n, m] = input.shift().split(" ").map(Number);
  const visited = Array.from(Array(n), () => Array(m).fill(false));
  const dx = [0, -1, 0, 1];
  const dy = [1, 0, -1, 0];
  const queue = [[0, 0, 1]];
  visited[0][0] = true;

  while (queue.length) {
    const [cx, cy, cnt] = queue.shift();
    if (cx === n - 1 && cy === m - 1) {
      console.log(cnt);
      break;
    }

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (visited[nx][ny]) continue;
      if (input[nx][ny] === "0") continue;

      visited[nx][ny] = true;
      queue.push([nx, ny, cnt + 1]);
    }
  }
}

solution();
