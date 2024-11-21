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

function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;
  const S = [];
  const E = [];
  const L = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (maps[i][j] === "S") S.push(i, j);
      if (maps[i][j] === "E") E.push(i, j);
      if (maps[i][j] === "L") L.push(i, j);
    }
  }

  let sToL = bfs(S, L);
  if (sToL === -1) return -1;
  let lToE = bfs(L, E);
  if (lToE === -1) return -1;

  return sToL + lToE;

  function bfs(S, E) {
    const dx = [0, -1, 0, 1];
    const dy = [1, 0, -1, 0];
    const visited = Array.from({ length: n }, () => Array(m).fill(false));
    const queue = new Queue();
    visited[S[0]][S[1]] = true;
    queue.enqueue([S[0], S[1], 0]);

    while (!queue.isEmpty()) {
      const [cx, cy, dist] = queue.dequeue();
      if (cx === E[0] && cy === E[1]) return dist;

      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];
        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
        if (maps[nx][ny] === "X") continue;
        if (visited[nx][ny]) continue;
        visited[nx][ny] = true;
        queue.enqueue([nx, ny, dist + 1]);
      }
    }

    return -1;
  }
}

const maps = ["SOOOL", "XXXXO", "OOOOO", "OXXXX", "OOOOE"];
console.log(solution(maps));
