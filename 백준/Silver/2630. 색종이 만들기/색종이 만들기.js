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

function solution() {
  const N = input();
  const board = [];
  let cnt0 = 0,
    cnt1 = 0;
  for (let i = 0; i < N; i++) {
    board.push(input().split(" ").map(Number));
  }
  func(N, 0, 0);
  console.log(cnt0);
  console.log(cnt1);

  function func(n, r, c) {
    let isSameBoard = true;
    const num = board[r][c];
    for (let i = r; i < r + n; i++) {
      for (let j = c; j < c + n; j++) {
        if (num === board[i][j]) continue;
        isSameBoard = false;
        break;
      }
    }

    if (isSameBoard) {
      if (num === 0) cnt0++;
      else cnt1++;
    } else {
      const half = n / 2;
      func(half, r, c);
      func(half, r, c + half);
      func(half, r + half, c);
      func(half, r + half, c + half);
    }
  }
}
