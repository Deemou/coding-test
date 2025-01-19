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

function solution(n, edge) {
  const graph = Array.from({ length: n + 1 }, () => []);

  for (const [u, v] of edge) {
    graph[u].push(v);
    graph[v].push(u);
  }

  return bfs();

  function bfs() {
    const queue = new Queue();
    const dists = Array(n + 1).fill(Infinity);
    let maxDist = 0;
    let countAtMaxDist = 0;

    queue.enqueue([1, 0]);
    dists[1] = 0;

    while (!queue.isEmpty()) {
      const [node, dist] = queue.dequeue();
      if (dist > maxDist) {
        maxDist = dist;
        countAtMaxDist = 1;
      } else if (dist === maxDist) countAtMaxDist++;

      for (const nextNode of graph[node]) {
        if (dists[nextNode] !== Infinity) continue;
        dists[nextNode] = dist + 1;
        queue.enqueue([nextNode, dist + 1]);
      }
    }

    return countAtMaxDist;
  }
}
