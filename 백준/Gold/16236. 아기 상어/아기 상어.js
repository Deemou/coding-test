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

class Queue {
  constructor() {
    this.inbox = [];
    this.outbox = [];
  }

  enqueue(data) {
    this.inbox.push(data);
  }

  dequeue() {
    if (this.isEmpty()) return null;
    if (!this.outbox.length) this.move();
    return this.outbox.pop();
  }

  size() {
    return this.inbox.length + this.outbox.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  peek() {
    if (this.isEmpty()) return null;
    if (!this.outbox.length) this.move();
    return this.outbox.at(-1);
  }

  move() {
    while (this.inbox.length) {
      this.outbox.push(this.inbox.pop());
    }
  }
}

function solution() {
  const N = +input();
  const sea = Array.from(Array(N), () => Array(N).fill(0));
  const shark = { size: 2, eat: 0, x: 0, y: 0, dist: 0 };
  for (let i = 0; i < N; i++) {
    const row = input().split(" ").map(Number);
    for (let j = 0; j < N; j++) {
      sea[i][j] = row[j];
      if (row[j] !== 9) continue;
      shark.x = i;
      shark.y = j;
      sea[i][j] = 0;
    }
  }

  const dx = [-1, 0, 0, 1];
  const dy = [0, -1, 1, 0];

  function bfs() {
    const visited = Array.from(Array(N), () => Array(N).fill(false));
    const queue = new Queue();
    queue.enqueue([shark.x, shark.y, 0]);
    visited[shark.x][shark.y] = true;
    const fishes = [];

    while (!queue.isEmpty()) {
      const [x, y, dist] = queue.dequeue();
      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
        if (visited[nx][ny]) continue;
        if (sea[nx][ny] > shark.size) continue;

        visited[nx][ny] = true;
        queue.enqueue([nx, ny, dist + 1]);
        if (sea[nx][ny] > 0 && sea[nx][ny] < shark.size)
          fishes.push([nx, ny, dist + 1]);
      }
      if (fishes.length && (queue.isEmpty() || queue.peek()[2] > dist)) {
        fishes.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        return fishes[0];
      }
    }
    return null;
  }

  while (true) {
    const fish = bfs();
    if (!fish) break;
    const [x, y, dist] = fish;
    shark.eat++;
    if (shark.eat === shark.size) {
      shark.size++;
      shark.eat = 0;
    }
    sea[x][y] = 0;
    shark.x = x;
    shark.y = y;
    shark.dist += dist;
  }
  return shark.dist;
}
