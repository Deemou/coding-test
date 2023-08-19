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
  let cnt1 = 0,
    cnt2 = 0,
    cnt3 = 0;
  for (let i = 0; i < N; i++) {
    board.push(input().split(" ").map(Number));
  }
  func(N, 0, 0);
  console.log(cnt1);
  console.log(cnt2);
  console.log(cnt3);

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
      if (num === -1) cnt1++;
      else if (num === 0) cnt2++;
      else cnt3++;
    } else {
      const length = n / 3;
      const double = length * 2;
      func(length, r, c);
      func(length, r, c + length);
      func(length, r, c + double);
      func(length, r + length, c);
      func(length, r + length, c + length);
      func(length, r + length, c + double);
      func(length, r + double, c);
      func(length, r + double, c + length);
      func(length, r + double, c + double);
    }
  }
}
