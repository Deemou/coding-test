function solution(N, road, K) {
  const graph = Array.from({ length: N + 1 }, () => []);

  for (const [a, b, time] of road) {
    graph[a].push({ to: b, time });
    graph[b].push({ to: a, time });
  }

  const distance = Array(N + 1).fill(Infinity);
  distance[1] = 0;

  const pq = new PriorityQueue();
  pq.enqueue(1, 0);

  // 다익스트라 알고리즘
  while (!pq.isEmpty()) {
    const { value: node, priority: cost } = pq.dequeue();

    if (cost > distance[node]) continue;

    for (let i = 0; i < graph[node].length; i++) {
      const { to, time } = graph[node][i];
      const newCost = distance[node] + time;
      if (newCost < distance[to]) {
        distance[to] = newCost;
        pq.enqueue(to, newCost);
      }
    }
  }

  return distance.filter((d) => d <= K).length;
}

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(value, priority) {
    this.heap.push({ value, priority });
    this.heapUp(this.heap.length - 1);
  }

  dequeue() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapDown(0);

    return min;
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

  size() {
    return this.heap.length;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  isEmpty() {
    return this.heap.length === 0;
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
}
