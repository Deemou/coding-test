class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  enqueue(data) {
    const newNode = new Node(data);

    if (this.isEmpty()) {
      this.front = newNode;
    } else {
      this.rear.next = newNode;
    }
    this.rear = newNode;
    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) return null;

    const dequeuedData = this.front.data;
    this.front = this.front.next;
    this.size--;

    if (this.isEmpty()) {
      this.rear = null;
    }

    return dequeuedData;
  }
}

function solution() {
  const fs = require("fs");
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "./example.txt";
  const input = fs.readFileSync(filePath).toString().trim().split("\n");
  const [n, m, k] = input[0].split(" ").map(Number);
  const dist = Array.from({ length: n }).map(() =>
    Array.from({ length: m }).map(() => Array.from({ length: k + 1 }))
  );
  const dx = [0, -1, 0, 1];
  const dy = [1, 0, -1, 0];

  return bfs();

  function bfs() {
    const queue = new Queue();
    queue.enqueue([0, 0, 0]);

    dist[0][0][0] = 1;

    while (!queue.isEmpty()) {
      const [cx, cy, w] = queue.dequeue();
      if (cx === n - 1 && cy === m - 1) return dist[cx][cy][w];

      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];
        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

        if (input[nx + 1][ny] === "0" && !dist[nx][ny][w]) {
          dist[nx][ny][w] = dist[cx][cy][w] + 1;
          queue.enqueue([nx, ny, w]);
        } else {
          if (w === k) continue;
          if (dist[nx][ny][w + 1]) continue;
          dist[nx][ny][w + 1] = dist[cx][cy][w] + 1;
          queue.enqueue([nx, ny, w + 1]);
        }
      }
    }
    return -1;
  }
}

console.log(solution());
