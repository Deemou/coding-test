const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const readline = require("readline");
let line = 0;
const lines = [];
const input = () => lines[line++];

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    lines.push(line);
  }).on("close", () => {
    console.log(solution());
    process.exit();
  });
}

readFile(filePath);

class Queue {
  constructor() {
    this.inbox = [];
    this.outbox = [];
  }

  enqueue(data) {
    this.inbox.push(data);
  }

  dequeue() {
    if (!this.outbox.length) {
      while (this.inbox.length) {
        this.outbox.push(this.inbox.pop());
      }
    }

    return this.outbox.pop();
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.inbox.length + this.outbox.length;
  }
}

function solution() {
  const BREAK_LIMIT = 1;

  const [n, m] = input().split(" ").map(Number);
  const board = Array.from({ length: n }, () => input().split("").map(Number));
  const dx = [0, -1, 0, 1];
  const dy = [1, 0, -1, 0];
  const dist = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => Array(2))
  );
  dist[0][0][0] = 1;
  const queue = new Queue();
  queue.enqueue([0, 0, 0]);

  while (!queue.isEmpty()) {
    const [cx, cy, w] = queue.dequeue();
    if (cx === n - 1 && cy === m - 1) return dist[cx][cy][w];

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (dist[nx][ny][w]) continue;

      if (board[nx][ny] === 0) {
        dist[nx][ny][w] = dist[cx][cy][w] + 1;
        queue.enqueue([nx, ny, w]);
      } else if (w < BREAK_LIMIT) {
        dist[nx][ny][w + 1] = dist[cx][cy][w] + 1;
        queue.enqueue([nx, ny, w + 1]);
      }
    }
  }

  return -1;
}
