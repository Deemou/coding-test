class MinHeap {
  constructor() {
    this.heap = [];
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

  size() {
    return this.heap.length;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  push(v) {
    this.heap.push(v);
    this.heapUp();
  }

  pop() {
    if (this.size() === 1) return this.heap.pop();
    if (this.size() === 0) return null;

    const v = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapDown();

    return v;
  }

  heapUp() {
    let child = this.size() - 1;
    let parent = this.getParent(child);

    while (this.heap[child] < this.heap[parent]) {
      this.swap(child, parent);
      child = parent;
      parent = this.getParent(child);
    }
  }

  heapDown() {
    let parent = 0;

    while (true) {
      const left = this.getLeftChild(parent);
      const right = this.getRightChild(parent);
      let smallest = parent;

      if (left < this.size() && this.heap[smallest] > this.heap[left])
        smallest = left;
      if (right < this.size() && this.heap[smallest] > this.heap[right])
        smallest = right;

      if (smallest === parent) break;

      this.swap(parent, smallest);
      parent = smallest;
    }
  }
}

function solution(scoville, K) {
  let cnt = 0;
  const heap = new MinHeap();

  scoville.forEach((v) => heap.push(v));

  while (heap.heap[0] < K && heap.size() > 1) {
    const f1 = heap.pop();
    const f2 = heap.pop();
    const mix = f1 + f2 * 2;

    heap.push(mix);
    cnt++;
  }

  return heap.heap[0] >= K ? cnt : -1;
}
