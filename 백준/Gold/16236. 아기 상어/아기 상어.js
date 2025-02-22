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

class PriorityQueue {
  constructor() {
    this.minHeap = [];
  }

  enqueue(value) {
    this.minHeap.push(value);
    this.heapUp();
  }

  dequeue() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.minHeap.pop();

    const min = this.minHeap[0];
    this.minHeap[0] = this.minHeap.pop();
    this.heapDown();

    return min;
  }

  heapUp() {
    let child = this.size() - 1;

    while (child > 0) {
      const parent = this.getParent(child);
      if (this.isHigherPriorityThan(parent, child)) break;

      this.swap(child, parent);
      child = parent;
    }
  }

  heapDown() {
    let parent = 0;

    while (true) {
      const left = this.getLeftChild(parent);
      const right = this.getRightChild(parent);
      let highest = parent;

      if (this.isValidChild(left) && this.isHigherPriorityThan(left, highest))
        highest = left;

      if (this.isValidChild(right) && this.isHigherPriorityThan(right, highest))
        highest = right;

      if (highest === parent) break;

      this.swap(parent, highest);
      parent = highest;
    }
  }

  isHigherPriorityThan(a, b) {
    const [ax, ay, at] = this.minHeap[a];
    const [bx, by, bt] = this.minHeap[b];

    if (at !== bt) return at < bt;
    if (ax !== bx) return ax < bx;
    return ay < by;
  }

  swap(a, b) {
    [this.minHeap[a], this.minHeap[b]] = [this.minHeap[b], this.minHeap[a]];
  }

  size() {
    return this.minHeap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  getParent(child) {
    return Math.floor((child - 1) / 2);
  }
  getLeftChild(parent) {
    return parent * 2 + 1;
  }
  getRightChild(parent) {
    return parent * 2 + 2;
  }
  isValidChild(index) {
    return index < this.size();
  }
}

function solution() {
  const N = Number(input());
  const board = Array.from(Array(N), () => input().split(" ").map(Number));
  const shark = { size: 2, eat: 0, x: 0, y: 0, time: 0 };
  const dx = [-1, 0, 0, 1];
  const dy = [0, -1, 1, 0];
  const visited = Array.from(Array(N), () => Array(N).fill(false));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] === 9) {
        shark.x = i;
        shark.y = j;
        board[i][j] = 0;
        break;
      }
    }
  }

  while (true) {
    const fish = bfs();
    if (!fish) break;

    moveShark(fish);
  }

  return shark.time;

  function bfs() {
    const queue = new PriorityQueue();

    for (let i = 0; i < N; i++) {
      visited[i].fill(false);
    }
    visited[shark.x][shark.y] = true;
    queue.enqueue([shark.x, shark.y, 0]);

    while (!queue.isEmpty()) {
      const [x, y, time] = queue.dequeue();
      if (board[x][y] > 0 && board[x][y] < shark.size) return [x, y, time];

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!isValidMove(nx, ny)) continue;

        visited[nx][ny] = true;
        queue.enqueue([nx, ny, time + 1]);
      }
    }

    return null;
  }

  function isValidMove(x, y) {
    if (x < 0 || y < 0 || x >= N || y >= N) return false;
    if (visited[x][y]) return false;
    if (board[x][y] > shark.size) return false;

    return true;
  }

  function moveShark([x, y, time]) {
    shark.eat++;
    if (shark.eat === shark.size) {
      shark.size++;
      shark.eat = 0;
    }

    board[x][y] = 0;
    shark.x = x;
    shark.y = y;
    shark.time += time;
  }
}
