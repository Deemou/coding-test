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
    console.log(solution());
    process.exit();
  });
}

readFile(filePath);

function solution() {
  const [r, c, n] = input().split(" ").map(Number);
  const BOMB = "O";
  const EMPTY = ".";
  const DEFAULT_BOMB_COUNT = 3;
  const board = Array.from({ length: r }, () =>
    input()
      .split("")
      .map((v) => (v === BOMB ? DEFAULT_BOMB_COUNT : v))
  );

  const dx = [0, -1, 0, 1];
  const dy = [1, 0, -1, 0];

  let willExplode = new Set();

  for (let t = 1; t <= n; t++) {
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        if (board[i][j] === EMPTY) continue;
        board[i][j]--;

        if (board[i][j] !== 0) continue;
        board[i][j] = EMPTY;

        for (let dir = 0; dir < 4; dir++) {
          const nx = i + dx[dir];
          const ny = j + dy[dir];

          if (nx < 0 || nx >= r || ny < 0 || ny >= c) continue;
          willExplode.add([nx, ny]);
        }
      }
    }

    if (t % 2 === 0) {
      for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
          if (board[i][j] !== EMPTY) continue;
          board[i][j] = DEFAULT_BOMB_COUNT;
        }
      }
    } else {
      willExplode.forEach(([x, y]) => {
        board[x][y] = EMPTY;
      });
      willExplode = new Set();
    }
  }

  return board
    .map((v) => v.map((e) => (e === EMPTY ? e : BOMB)).join(""))
    .join("\n");
}
