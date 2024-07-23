const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const readline = require("readline");
let line = 0;
const lines = [];
const input = () => lines[line++];

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    lines.push(line);
  }).on("close", () => {
    solution();
    process.exit();
  });
}

readFile(filePath);

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

function solution() {
  const [n, m] = input().split(" ").map(Number);
  const maze = [];
  let rStart, bStart;
  const WALL = "#";
  const HOLE = "O";

  for (let i = 0; i < n; i++) {
    const row = input().split("");
    maze.push(row);

    for (let j = 0; j < m; j++) {
      if (row[j] === "R") rStart = [i, j];
      if (row[j] === "B") bStart = [i, j];
    }
  }

  const dx = [0, -1, 0, 1];
  const dy = [1, 0, -1, 0];

  function move(x, y, dx, dy, maze) {
    let moveCnt = 0;

    while (true) {
      if (maze[x + dx][y + dy] === WALL) break;
      if (maze[x][y] === HOLE) break;

      x += dx;
      y += dy;
      moveCnt++;
    }

    return [x, y, moveCnt];
  }

  function bfs(maze, rStart, bStart) {
    const queue = new Queue();
    const visited = new Set();

    queue.enqueue({
      rx: rStart[0],
      ry: rStart[1],
      bx: bStart[0],
      by: bStart[1],
      tryCnt: 0,
    });
    visited.add(`${rStart[0]},${rStart[1]},${bStart[0]},${bStart[1]}`);

    while (!queue.isEmpty()) {
      const { rx, ry, bx, by, tryCnt } = queue.dequeue();

      if (tryCnt >= 10) return -1;

      for (let dir = 0; dir < 4; dir++) {
        const cdx = dx[dir];
        const cdy = dy[dir];

        let [nrx, nry, redMoves] = move(rx, ry, cdx, cdy, maze);
        let [nbx, nby, blueMoves] = move(bx, by, cdx, cdy, maze);

        if (maze[nbx][nby] === HOLE) continue;
        if (maze[nrx][nry] === HOLE) return tryCnt + 1;

        if (nrx === nbx && nry === nby) {
          if (redMoves > blueMoves) {
            nrx -= cdx;
            nry -= cdy;
          } else {
            nbx -= cdx;
            nby -= cdy;
          }
        }

        const newState = `${nrx},${nry},${nbx},${nby}`;
        if (visited.has(newState)) continue;
        visited.add(newState);
        queue.enqueue({
          rx: nrx,
          ry: nry,
          bx: nbx,
          by: nby,
          tryCnt: tryCnt + 1,
        });
      }
    }

    return -1;
  }

  const result = bfs(maze, rStart, bStart);
  console.log(result);
}
