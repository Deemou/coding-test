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

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(v) {
    this.heap.push(v);
    this.heapUp();
  }

  remove() {
    if (this.size() === 1) return this.heap.pop();
    if (this.size() === 0) return null;

    const v = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapDown();

    return v;
  }

  heapUp() {
    let child = this.size() - 1;

    while (child > 0) {
      const parent = this.getParent(child);
      if (this.heap[child] >= this.heap[parent]) break;

      this.swap(child, parent);
      child = parent;
    }
  }

  heapDown() {
    let parent = 0;

    while (true) {
      const left = this.getLeftChild(parent);
      const right = this.getRightChild(parent);
      let smallest = parent;

      if (this.isValidChild(left) && this.heap[smallest] > this.heap[left])
        smallest = left;
      if (this.isValidChild(right) && this.heap[smallest] > this.heap[right])
        smallest = right;

      if (smallest === parent) break;

      this.swap(parent, smallest);
      parent = smallest;
    }
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
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
  const [n, m] = input().split(" ").map(Number);
  const cards = input().split(" ").map(Number);
  const heap = new MinHeap();
  for (const card of cards) {
    heap.insert(BigInt(card));
  }

  for (let i = 0; i < m; i++) {
    const x = heap.remove();
    const y = heap.remove();
    const newVal = BigInt(x) + BigInt(y);
    heap.insert(newVal);
    heap.insert(newVal);
  }

  let sum = BigInt(0);
  for (let i = 0; i < n; i++) {
    sum += heap.remove();
  }

  return sum.toString();
}
