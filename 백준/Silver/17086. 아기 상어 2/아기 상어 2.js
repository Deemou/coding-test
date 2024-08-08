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

  size() {
    return this.inbox.length + this.outbox.length;
  }

  isEmpty() {
    return this.size() === 0;
  }
}

function solution() {
  const [n, m] = input().split(" ").map(Number);
  const board = Array.from({ length: n }, () => input().split(" ").map(Number));
  const dx = [0, -1, -1, -1, 0, 1, 1, 1];
  const dy = [1, 1, 0, -1, -1, -1, 0, 1];
  const SHARK = 1;
  const dist = Array.from({ length: n }, () => Array(m).fill(Infinity));
  let answer = 0;

  const queue = new Queue();

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] !== SHARK) continue;
      dist[i][j] = 0;
      queue.enqueue([i, j]);
    }
  }

  while (!queue.isEmpty()) {
    const [cx, cy] = queue.dequeue();
    answer = Math.max(answer, dist[cx][cy]);

    for (let i = 0; i < 8; i++) {
      for (let i = 0; i < 8; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];

        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
        if (dist[nx][ny] !== Infinity) continue;

        dist[nx][ny] = dist[cx][cy] + 1;
        queue.enqueue([nx, ny]);
      }
    }
  }

  return answer;
}
