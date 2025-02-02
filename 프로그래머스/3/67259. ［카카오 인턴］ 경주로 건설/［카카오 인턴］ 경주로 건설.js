class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(value, priority) {
    this.heap.push({ value, priority });
    this.heapUp();
  }

  dequeue() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapDown();

    return min;
  }

  heapUp() {
    let child = this.size() - 1;

    while (child > 0) {
      const parent = this.getParent(child);
      if (this.isLowerPriorityThan(child, parent)) break;

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

      if (this.isValidChild(left) && this.isLowerPriorityThan(highest, left))
        highest = left;

      if (this.isValidChild(right) && this.isLowerPriorityThan(highest, right))
        highest = right;

      if (highest === parent) break;

      this.swap(parent, highest);
      parent = highest;
    }
  }

  isLowerPriorityThan(a, b) {
    if (this.heap[a].priority > this.heap[b].priority) return true;

    return false;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  size() {
    return this.heap.length;
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

function solution(board) {
  const ROAD_COST = 100;
  const CORNER_COST = 500;

  const n = board.length;
  const cost = Array.from({ length: n }, () => Array(n).fill(Infinity));
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const queue = new PriorityQueue();
  queue.enqueue([0, 0, 0, -1], 0);

  cost[0][0] = 0;

  while (!queue.isEmpty()) {
    const [currCost, x, y, dir] = queue.dequeue().value;

    for (let i = 0; i < directions.length; i++) {
      const [dx, dy] = directions[i];
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || ny < 0 || nx >= n || ny >= n) continue;
      if (board[nx][ny] === 1) continue;

      let newCost = currCost + ROAD_COST;
      if (dir !== -1 && dir !== i) newCost += CORNER_COST;

      if (newCost >= cost[nx][ny] + CORNER_COST) continue;
      cost[nx][ny] = Math.min(cost[nx][ny], newCost);
      queue.enqueue([newCost, nx, ny, i], newCost);
    }
  }

  return cost[n - 1][n - 1];
}
