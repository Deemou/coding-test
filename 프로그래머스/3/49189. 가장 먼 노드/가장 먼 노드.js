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
    const visited = Array(n + 1).fill(false);
    let maxDist = 0;
    let countAtMaxDist = 0;

    queue.enqueue([1, 0]);
    visited[1] = true;

    while (!queue.isEmpty()) {
      const [node, dist] = queue.dequeue();
      if (dist > maxDist) {
        maxDist = dist;
        countAtMaxDist = 1;
      } else if (dist === maxDist) countAtMaxDist++;

      for (const nextNode of graph[node]) {
        if (visited[nextNode]) continue;
        visited[nextNode] = true;
        queue.enqueue([nextNode, dist + 1]);
      }
    }

    return countAtMaxDist;
  }
}
