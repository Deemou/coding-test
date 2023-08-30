const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const readline = require("readline");
let line = 0;
let stdin = [];
const input = () => stdin[line++];

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    stdin.push(line);
  }).on("close", () => {
    solution();
    process.exit();
  });
}

readFile(filePath);

class Dice {
  constructor() {
    this.top = 1;
    this.bottom = 6;
    this.left = 4;
    this.right = 3;
    this.front = 5;
    this.back = 2;
  }

  rollEast() {
    const tmp = this.top;
    this.top = this.left;
    this.left = this.bottom;
    this.bottom = this.right;
    this.right = tmp;
  }

  rollWest() {
    const tmp = this.top;
    this.top = this.right;
    this.right = this.bottom;
    this.bottom = this.left;
    this.left = tmp;
  }

  rollNorth() {
    const tmp = this.top;
    this.top = this.front;
    this.front = this.bottom;
    this.bottom = this.back;
    this.back = tmp;
  }

  rollSouth() {
    const tmp = this.top;
    this.top = this.back;
    this.back = this.bottom;
    this.bottom = this.front;
    this.front = tmp;
  }

  setBottom(v) {
    this.bottom = v;
  }
}

const EAST = 1,
  WEST = -1,
  SOUTH = 2,
  NORTH = -2;

function solution() {
  const [n, m, k] = input().split(" ").map(Number);
  const visited = Array.from({ length: n }).map(() =>
    Array.from({ length: m })
  );

  const board = [];
  for (let i = 0; i < n; i++) {
    const row = input().split(" ").map(Number);
    board.push(row);
  }

  let dir = EAST;

  const dx = [0, 0, -1, 1];
  const dy = [1, -1, 0, 0];

  const dice = new Dice();
  let [cx, cy] = [0, 0];
  let ans = 0;

  for (let i = 0; i < k; i++) {
    let nx = cx,
      ny = cy;
    if (dir === EAST) ny++;
    else if (dir === WEST) ny--;
    else if (dir === SOUTH) nx++;
    else if (dir === NORTH) nx--;

    if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
      dir = -dir;
      i--;
      continue;
    }

    if (dir === EAST) dice.rollEast();
    else if (dir === WEST) dice.rollWest();
    else if (dir === SOUTH) dice.rollSouth();
    else if (dir === NORTH) dice.rollNorth();

    const cnt = bfs(nx, ny, board[nx][ny]);
    const score = board[nx][ny] * cnt;
    ans += score;

    if (dice.bottom > board[nx][ny]) dir = rotateClockwise(dir);
    else if (dice.bottom < board[nx][ny]) dir = rotateCounterClockwise(dir);

    cx = nx;
    cy = ny;
  }

  function bfs(x, y, v) {
    for (let i = 0; i < n; i++) {
      visited[i].fill(false);
    }

    let cnt = 0;
    const queue = [[x, y]];
    let front = 0;
    visited[x][y] = true;

    while (queue.length !== front) {
      const [cx, cy] = queue[front];
      front++;
      cnt++;

      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];

        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
        if (board[nx][ny] !== v) continue;
        if (visited[nx][ny]) continue;
        visited[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }
    return cnt;
  }
  console.log(ans);
}

function rotateClockwise(dir) {
  if (dir === EAST) return SOUTH;
  if (dir === WEST) return NORTH;
  if (dir === SOUTH) return WEST;
  if (dir === NORTH) return EAST;
}

function rotateCounterClockwise(dir) {
  if (dir === EAST) return NORTH;
  if (dir === WEST) return SOUTH;
  if (dir === SOUTH) return EAST;
  if (dir === NORTH) return WEST;
}
