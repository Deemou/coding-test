class MaxHeap {
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
      if (this.heap[child] <= this.heap[parent]) break;

      this.swap(child, parent);
      child = parent;
    }
  }

  heapDown() {
    let parent = 0;

    while (true) {
      const left = this.getLeftChild(parent);
      const right = this.getRightChild(parent);
      let biggest = parent;

      if (this.isValidChild(left) && this.heap[biggest] < this.heap[left])
        biggest = left;
      if (this.isValidChild(right) && this.heap[biggest] < this.heap[right])
        biggest = right;

      if (biggest === parent) break;

      this.swap(parent, biggest);
      parent = biggest;
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

function solution(n, works) {
  let totalFatigue = 0;
  const maxHeap = new MaxHeap();

  for (const work of works) {
    maxHeap.insert(work);
  }

  for (let i = 0; i < n; i++) {
    const maxWork = maxHeap.remove();
    if (maxWork === 0) break;

    maxHeap.insert(maxWork - 1);
  }

  while (!maxHeap.isEmpty()) {
    const remainingWork = maxHeap.remove();
    totalFatigue += remainingWork ** 2;
  }

  return totalFatigue;
}
