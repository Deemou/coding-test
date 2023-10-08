const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const readline = require("readline");
let line = 0;
let stdin = [];
const input = () => stdin[line++];

readFile(filePath);

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    stdin.push(line);
  }).on("close", () => {
    console.log(solution());
    process.exit();
  });
}

function solution() {
  let [N, M] = input().split(" ").map(Number);
  let board = [];
  for (let i = 0; i < N; i++) {
    board.push(input());
  }

  function checkBoard(startX, startY) {
    const startColor = board[startX][startY];
    let flipCount = 0;

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 0) {
          if (board[startX + i][startY + j] !== startColor) {
            flipCount++;
          }
        } else {
          if (board[startX + i][startY + j] === startColor) {
            flipCount++;
          }
        }
      }
    }

    return Math.min(flipCount, 64 - flipCount);
  }

  let minFlips = Infinity;

  for (let i = 0; i <= N - 8; i++) {
    for (let j = 0; j <= M - 8; j++) {
      minFlips = Math.min(minFlips, checkBoard(i, j));
    }
  }

  return minFlips;
}
