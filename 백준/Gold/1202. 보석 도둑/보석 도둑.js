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
    this.maxHeap = [];
  }

  enqueue(value) {
    this.maxHeap.push(value);
    this.heapUp();
  }

  dequeue() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.maxHeap.pop();

    const max = this.maxHeap[0];
    this.maxHeap[0] = this.maxHeap.pop();
    this.heapDown();

    return max;
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
    if (this.maxHeap[a] > this.maxHeap[b]) return true;

    return false;
  }

  swap(a, b) {
    [this.maxHeap[a], this.maxHeap[b]] = [this.maxHeap[b], this.maxHeap[a]];
  }

  size() {
    return this.maxHeap.length;
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
  const [n, k] = input().split(" ").map(Number);
  const gems = Array.from({ length: n }, () => input().split(" ").map(Number));
  const bags = Array.from({ length: k }, () => Number(input()));
  let gemIdx = 0;
  let answer = 0;

  gems.sort((a, b) => a[0] - b[0]);
  bags.sort((a, b) => a - b);

  const pq = new PriorityQueue();

  for (const bag of bags) {
    while (gemIdx < n && gems[gemIdx][0] <= bag) {
      pq.enqueue(gems[gemIdx][1]);
      gemIdx++;
    }

    if (!pq.isEmpty()) {
      answer += pq.dequeue();
    }
  }

  return answer;
}
