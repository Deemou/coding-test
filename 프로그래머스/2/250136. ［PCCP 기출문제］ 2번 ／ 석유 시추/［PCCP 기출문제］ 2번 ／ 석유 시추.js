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

  isEmpty() {
    return this.inbox.length + this.outbox.length === 0;
  }
}

function solution(land) {
  const EMPTY = 0;
  const OIL = 1;

  const n = land.length;
  const m = land[0].length;
  let oilIdx = 2;
  const oils = [0, 0];
  const visited = Array.from({ length: n }, () => Array(m).fill(false));
  const dirs = [
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 0],
  ];
  let answer = 0;

  for (let i = 0; i < m; i++) {
    const visitedOil = new Set();
    let totalOil = 0;

    for (let j = 0; j < n; j++) {
      const tileNum = land[j][i];
      if (tileNum === EMPTY) continue;

      if (tileNum === OIL) {
        const amount = bfs(j, i);
        totalOil += amount;
        oils[oilIdx] = amount;
        visitedOil.add(oilIdx);
        oilIdx++;
      } else {
        if (visitedOil.has(tileNum)) continue;
        visitedOil.add(tileNum);
        totalOil += oils[tileNum];
      }
    }

    answer = Math.max(answer, totalOil);
  }

  return answer;

  function bfs(x, y) {
    let totalOil = 1;
    const queue = new Queue();
    queue.enqueue([x, y]);
    visited[x][y] = true;

    while (!queue.isEmpty()) {
      const [cx, cy] = queue.dequeue();
      land[cx][cy] = oilIdx;

      for (const [dx, dy] of dirs) {
        const nx = cx + dx;
        const ny = cy + dy;

        if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
        if (visited[nx][ny]) continue;
        if (land[nx][ny] === EMPTY) continue;

        visited[nx][ny] = true;
        totalOil += 1;
        queue.enqueue([nx, ny]);
      }
    }

    return totalOil;
  }
}
