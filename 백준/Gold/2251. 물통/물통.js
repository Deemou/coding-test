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
  const [A, B, C] = input().split(" ").map(Number);
  const queue = new Queue();
  const visited = new Set();
  const answer = new Set();

  queue.enqueue([0, 0, C]);

  while (!queue.isEmpty()) {
    const [a, b, c] = queue.dequeue();
    const key = `${a},${b},${c}`;

    if (visited.has(key)) continue;
    visited.add(key);

    if (a === 0) answer.add(c);

    let water = 0;
    // A to B
    water = Math.min(a, B - b);
    queue.enqueue([a - water, b + water, c]);
    // A to C
    water = Math.min(a, C - c);
    queue.enqueue([a - water, b, c + water]);
    // B to A
    water = Math.min(b, A - a);
    queue.enqueue([a + water, b - water, c]);
    // B to C
    water = Math.min(b, C - c);
    queue.enqueue([a, b - water, c + water]);
    // C to A
    water = Math.min(c, A - a);
    queue.enqueue([a + water, b, c - water]);
    // C to B
    water = Math.min(c, B - b);
    queue.enqueue([a, b + water, c - water]);
  }

  return [...answer]
    .map((v) => Number(v))
    .sort((a, b) => a - b)
    .join(" ");
}
