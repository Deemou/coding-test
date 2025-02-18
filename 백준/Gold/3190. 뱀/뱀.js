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

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const readline = require("readline");
let line = 0;
let stdin = [];
const input = () => stdin[line++];

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    stdin.push(line);
  }).on("close", () => {
    console.log(solution());
    process.exit();
  });
}

readFile(filePath);

function solution() {
  const N = +input();
  const K = +input();
  const [EMPTY, APPLE, BODY] = [0, 1, 2];
  const [EAST, SOUTH, WEST, NORTH] = [0, 1, 2, 3];
  let direction = EAST;
  const board = Array.from({ length: N }, () => Array(N).fill(0));
  const queue = new Queue();

  for (let i = 0; i < K; i++) {
    const [x, y] = input().split(" ").map(Number);
    board[x - 1][y - 1] = APPLE;
  }

  board[0][0] = BODY;
  queue.enqueue([0, 0]);
  let [hx, hy] = [0, 0];

  const L = +input();
  let time = 0;

  for (let i = 0; i < L; i++) {
    const [X, C] = input().split(" ");
    for (let j = time; j < X; j++) {
      const canContinue = move();
      time++;
      if (!canContinue) return time;
    }
    if (C === "L") direction = (direction + 3) % 4;
    else direction = (direction + 1) % 4;
  }

  while (true) {
    const canContinue = move();
    time++;
    if (!canContinue) return time;
  }

  function move() {
    if (direction === EAST) hy += 1;
    else if (direction === WEST) hy -= 1;
    else if (direction === SOUTH) hx += 1;
    else hx -= 1;

    if (hx < 0 || hy < 0 || hx >= N || hy >= N) return false;
    if (board[hx][hy] === BODY) return false;

    if (board[hx][hy] === EMPTY) {
      const [dx, dy] = queue.dequeue();
      board[dx][dy] = EMPTY;
    }
    queue.enqueue([hx, hy]);
    board[hx][hy] = BODY;

    return true;
  }
}
