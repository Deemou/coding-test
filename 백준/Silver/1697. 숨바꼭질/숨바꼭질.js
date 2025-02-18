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
  const [n, k] = input().split(" ").map(Number);
  if (k <= n) return n - k;

  const LIMIT = 100000;

  const dist = Array(LIMIT + 1);
  const queue = new Queue();
  dist[n] = 0;
  queue.enqueue(n);

  while (!queue.isEmpty()) {
    const cx = queue.dequeue();
    if (cx === k) return dist[cx];

    const nexts = [cx - 1, cx + 1, 2 * cx];
    for (const next of nexts) {
      if (next < 0 || next > LIMIT) continue;
      if (dist[next]) continue;

      dist[next] = dist[cx] + 1;
      queue.enqueue(next);
    }
  }
}
