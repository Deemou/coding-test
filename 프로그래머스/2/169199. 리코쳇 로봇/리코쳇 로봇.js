class Queue {
  constructor() {
    this.inbox = [];
    this.outbox = [];
  }

  enqueue(v) {
    this.inbox.push(v);
  }

  dequeue() {
    if (this.outbox.length === 0) {
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

function solution(board) {
  const ROBOT = "R";
  const GOAL = "G";
  const OBSTACLE = "D";

  const [n, m] = [board.length, board[0].length];
  const start = [];
  const goal = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === ROBOT) start.push(i, j);
      if (board[i][j] === GOAL) goal.push(i, j);
    }
  }

  return bfs(start, goal);

  function bfs(start, goal) {
    const [sx, sy] = start;
    const [gx, gy] = goal;
    const dx = [0, -1, 0, 1];
    const dy = [1, 0, -1, 0];
    const visited = Array.from({ length: n }, () => Array(m).fill(false));
    const queue = new Queue();
    queue.enqueue([sx, sy, 0]);
    visited[sx][sy] = true;

    while (!queue.isEmpty()) {
      const [cx, cy, cnt] = queue.dequeue();
      if (cx === gx && cy === gy) return cnt;

      for (let i = 0; i < 4; i++) {
        const [nx, ny] = getNextPosition(cx, cy, dx[i], dy[i]);

        if (visited[nx][ny]) continue;
        visited[nx][ny] = true;

        queue.enqueue([nx, ny, cnt + 1]);
      }
    }

    return -1;
  }

  function getNextPosition(x, y, dx, dy) {
    while (true) {
      const [nx, ny] = [x + dx, y + dy];
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) break;
      if (board[nx][ny] === OBSTACLE) break;
      [x, y] = [nx, ny];
    }

    return [x, y];
  }
}