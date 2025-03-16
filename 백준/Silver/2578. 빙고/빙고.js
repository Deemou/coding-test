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
  const TARGET_BINGO_COUNT = 3;

  const n = 5;
  const board = Array.from({ length: n }, () => input().split(" ").map(Number));
  const numberPositions = new Map();
  board.forEach((row, i) => {
    row.forEach((num, j) => {
      numberPositions.set(num, [i, j]);
    });
  });

  const rowCounts = Array(n).fill(0);
  const colCounts = Array(n).fill(0);
  let diag1Count = 0,
    diag2Count = 0;
  let bingoCount = 0;

  const calledNumbers = Array.from({ length: n }, () =>
    input().split(" ").map(Number)
  ).flat();

  for (let i = 0; i < calledNumbers.length; i++) {
    const num = calledNumbers[i];
    if (numberPositions.has(num)) {
      const [row, col] = numberPositions.get(num);
      updateBingo(row, col);

      if (bingoCount >= TARGET_BINGO_COUNT) return i + 1;
    }
  }

  return "No bingo";

  function updateBingo(row, col) {
    if (++rowCounts[row] === n) bingoCount++;
    if (++colCounts[col] === n) bingoCount++;
    if (row === col && ++diag1Count === n) bingoCount++;
    if (row + col === n - 1 && ++diag2Count === n) bingoCount++;
  }
}
