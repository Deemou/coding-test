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

function solution(N, road, K) {
  const graph = Array.from({ length: N + 1 }, () => []);

  for (const [a, b, weight] of road) {
    graph[a].push({ adjacentNode: b, weight });
    graph[b].push({ adjacentNode: a, weight });
  }

  const shortestDistances = Array(N + 1).fill(Infinity);
  shortestDistances[1] = 0;

  const pq = new PriorityQueue();
  pq.enqueue(1, 0);

  // 다익스트라 알고리즘
  while (!pq.isEmpty()) {
    const { value: currentNode, priority: currentDistance } = pq.dequeue();

    if (currentDistance > shortestDistances[currentNode]) continue;

    for (let i = 0; i < graph[currentNode].length; i++) {
      const { adjacentNode, weight } = graph[currentNode][i];
      const newDistance = shortestDistances[currentNode] + weight;
      if (newDistance >= shortestDistances[adjacentNode]) continue;

      shortestDistances[adjacentNode] = newDistance;
      pq.enqueue(adjacentNode, newDistance);
    }
  }

  return shortestDistances.filter((d) => d <= K).length;
}
