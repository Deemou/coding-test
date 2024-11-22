class Queue {
  constructor() {
    this.inbox = [];
    this.outbox = [];
  }

  enqueue(data) {
    this.inbox.push(data);
  }

  dequeue() {
    if (!this.outbox.length) {
      while (this.inbox.length) {
        this.outbox.push(this.inbox.pop());
      }
    }
    return this.outbox.pop();
  }

  size() {
    return this.inbox.length + this.outbox.length;
  }

  isEmpty() {
    return this.size() === 0;
  }
}

function solution(n, roads, sources, destination) {
  const answer = [];
  const graph = new Map();
  for (const [a, b] of roads) {
    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);
    graph.get(a).push(b);
    graph.get(b).push(a);
  }
  const distances = Array(n + 1).fill(Infinity);
  bfs();

  for (const source of sources) {
    const distance = distances[source];
    answer.push(distance === Infinity ? -1 : distance);
  }

  return answer;

  function bfs() {
    distances[destination] = 0;
    const queue = new Queue();
    queue.enqueue([destination, 0]);

    while (!queue.isEmpty()) {
      const [current, dist] = queue.dequeue();
      const adjacentNodes = graph.get(current) || [];

      for (const next of adjacentNodes) {
        if (distances[next] <= dist + 1) continue;
        distances[next] = dist + 1;
        queue.enqueue([next, dist + 1]);
      }
    }
  }
}