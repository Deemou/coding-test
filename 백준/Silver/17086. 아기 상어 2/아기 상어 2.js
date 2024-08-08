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
  let answer = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === SHARK) continue;
      const dist = bfs(i, j);
      answer = Math.max(answer, dist);
    }
  }

  return answer;

  function bfs(x, y) {
    const visited = Array.from({ length: n }, () => Array(m).fill(false));
    const queue = new Queue();
    let max = 1;
    visited[x][y] = true;
    queue.enqueue([x, y, 1]);

    while (!queue.isEmpty()) {
      const [cx, cy, dist] = queue.dequeue();
      max = Math.max(max, dist);

      for (let i = 0; i < 8; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];

        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
        if (visited[nx][ny]) continue;
        if (board[nx][ny] === SHARK) return max;

        visited[nx][ny] = true;
        queue.enqueue([nx, ny, dist + 1]);
      }
    }

    return max;
  }
}
