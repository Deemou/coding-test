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

function solution(book_time) {
  const CLEANING_TIME = 10;

  let rooms = 0;
  const minHeap = new MinHeap();
  const reservations = book_time.map(([start, end]) => {
    const startTime = convertToMinutes(start);
    const endTime = convertToMinutes(end) + CLEANING_TIME;
    return [startTime, endTime];
  });
  reservations.sort((a, b) => a[0] - b[0]);

  for (const [start, end] of reservations) {
    while (!minHeap.isEmpty() && minHeap.heap[0] <= start) {
      minHeap.remove();
    }

    minHeap.insert(end);
    rooms = Math.max(rooms, minHeap.size());
  }

  return rooms;
}

function convertToMinutes(time) {
  const MINUTES_IN_HOUR = 60;
  const [h, m] = time.split(":");

  return Number(h) * MINUTES_IN_HOUR + Number(m);
}