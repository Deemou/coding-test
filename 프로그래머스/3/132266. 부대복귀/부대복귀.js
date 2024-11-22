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
  for (let i = 0; i < roads.length; i++) {
    const [a, b] = roads[i];
    const aConnections = graph.get(a) || [];
    aConnections.push(b);
    graph.set(a, aConnections);
    const bConnections = graph.get(b) || [];
    bConnections.push(a);
    graph.set(b, bConnections);
  }
  const distances = Array(n + 1).fill(Infinity);
  bfs();

  for (let i = 0; i < sources.length; i++) {
    const dist = distances[sources[i]];
    answer.push(dist === Infinity ? -1 : dist);
  }

  return answer;

  function bfs() {
    distances[destination] = 0;
    const queue = new Queue();
    queue.enqueue([destination, 0]);

    while (!queue.isEmpty()) {
      const [current, dist] = queue.dequeue();
      const nexts = graph.get(current) || [];

      for (let i = 0; i < nexts.length; i++) {
        const next = nexts[i];
        if (distances[next] <= dist + 1) continue;
        distances[next] = dist + 1;
        queue.enqueue([next, dist + 1]);
      }
    }
  }
}