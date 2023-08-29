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
    this.top = 0;
    this.bottom = 0;
    this.left = 0;
    this.right = 0;
    this.front = 0;
    this.back = 0;
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

function solution() {
  const [n, m, x, y, k] = input().split(" ").map(Number);
  const board = [];
  for (let i = 0; i < n; i++) {
    const row = input().split(" ").map(Number);
    board.push(row);
  }
  const dirs = input().split(" ").map(Number);

  const dx = [0, 0, -1, 1];
  const dy = [1, -1, 0, 0];

  const dice = new Dice();
  let [cx, cy] = [x, y];
  let ans = [];

  for (let i = 0; i < k; i++) {
    const dir = dirs[i];
    const nx = cx + dx[dir - 1];
    const ny = cy + dy[dir - 1];
    if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

    if (dir === 1) dice.rollEast();
    else if (dir === 2) dice.rollWest();
    else if (dir === 3) dice.rollNorth();
    else if (dir === 4) dice.rollSouth();

    if (board[nx][ny] === 0) {
      board[nx][ny] = dice.bottom;
    } else {
      dice.setBottom(board[nx][ny]);
      board[nx][ny] = 0;
    }
    cx = nx;
    cy = ny;
    ans.push(dice.top);
  }

  console.log(ans.join("\n"));
}
