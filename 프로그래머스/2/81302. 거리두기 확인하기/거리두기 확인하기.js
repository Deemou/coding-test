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

function solution(places) {
  const answer = [];
  const EMPTY_SEAT = "O";
  const PARTITION = "X";
  const PERSON = "P";
  const SAFE = 1;
  const UNSAFE = 0;
  const LENGTH = 5;

  for (let i = 0; i < LENGTH; i++) {
    const place = places[i];
    if (isValidDistance(place)) answer.push(SAFE);
    else answer.push(UNSAFE);
  }

  return answer;

  function isValidDistance(place) {
    for (let i = 0; i < LENGTH; i++) {
      for (let j = 0; j < LENGTH; j++) {
        if (place[i][j] !== PERSON) continue;
        if (!bfs(place, i, j)) return false;
      }
    }
    return true;
  }

  function bfs(place, x, y) {
    const dx = [0, -1, 0, 1];
    const dy = [1, 0, -1, 0];
    const visited = Array.from({ length: LENGTH }, () =>
      Array(LENGTH).fill(false)
    );
    const queue = new Queue();
    queue.enqueue([x, y, 0]);
    visited[x][y] = true;

    while (!queue.isEmpty()) {
      const [cx, cy, dist] = queue.dequeue();

      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];

        if (nx < 0 || nx >= LENGTH) continue;
        if (ny < 0 || ny >= LENGTH) continue;
        if (visited[nx][ny]) continue;
        if (place[nx][ny] === PERSON) return false;
        if (place[nx][ny] === PARTITION) continue;
        if (dist >= 1) continue;

        visited[nx][ny] = true;
        queue.enqueue([nx, ny, dist + 1]);
      }
    }

    return true;
  }
}
