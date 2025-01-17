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
      if (this.heap[child].priority >= this.heap[parent].priority) break;

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

      if (
        this.isValidChild(left) &&
        this.heap[left].priority < this.heap[smallest].priority
      )
        smallest = left;

      if (
        this.isValidChild(right) &&
        this.heap[right].priority < this.heap[smallest].priority
      )
        smallest = right;

      if (smallest === parent) break;

      this.swap(parent, smallest);
      parent = smallest;
    }
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

function solution(n, s, a, b, fares) {
  const graph = Array.from({ length: n + 1 }, () => []);

  for (const [u, v, w] of fares) {
    graph[u].push([v, w]);
    graph[v].push([u, w]);
  }

  const distFromS = dijkstra(s);
  const distFromA = dijkstra(a);
  const distFromB = dijkstra(b);

  let minFare = Infinity;
  for (let i = 1; i <= n; i++) {
    const fare = distFromS[i] + distFromA[i] + distFromB[i];
    minFare = Math.min(minFare, fare);
  }

  return minFare;

  function dijkstra(start) {
    const dist = Array(n + 1).fill(Infinity);
    const pq = new PriorityQueue();
    pq.enqueue(start, 0);
    dist[start] = 0;

    while (!pq.isEmpty()) {
      const { value: node, priority: cost } = pq.dequeue();

      for (const [next, weight] of graph[node]) {
        const newCost = cost + weight;
        if (newCost >= dist[next]) continue;

        dist[next] = newCost;
        pq.enqueue(next, newCost);
      }
    }

    return dist;
  }
}
