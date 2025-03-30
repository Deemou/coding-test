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
  const N = Number(input());

  if (N < 10) return N;

  const queue = new Queue();
  for (let i = 1; i <= 9; i++) {
    queue.enqueue(i);
  }

  let cnt = 9;

  while (!queue.isEmpty()) {
    const num = queue.dequeue();
    const lastDigit = num % 10;

    for (let i = 0; i < lastDigit; i++) {
      const newNum = num * 10 + i;
      queue.enqueue(newNum);
      cnt++;

      if (cnt === N) return newNum;
    }
  }

  return -1;
}
