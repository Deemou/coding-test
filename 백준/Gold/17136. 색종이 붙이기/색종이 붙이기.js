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
  const n = 10;
  const paper = [];
  const sizes = Array(6).fill(5);
  let result = Infinity;
  for (let i = 0; i < n; i++) {
    const row = input().split(" ").map(Number);
    paper.push(row);
  }

  function isCoverable(x, y, size) {
    if (x + size > n || y + size > n) return false;
    for (let i = x; i < x + size; i++) {
      for (let j = y; j < y + size; j++) {
        if (paper[i][j] === 0) return false;
      }
    }
    return true;
  }

  function setPaper(x, y, size, num) {
    for (let i = x; i < x + size; i++) {
      for (let j = y; j < y + size; j++) {
        paper[i][j] = num;
      }
    }
  }

  function dfs(x, y, cnt) {
    if (y === n) {
      dfs(x + 1, 0, cnt);
      return;
    }

    if (x === n) {
      result = Math.min(result, cnt);
      return;
    }

    if (paper[x][y]) {
      for (let size = 5; size > 0; size--) {
        if (isCoverable(x, y, size) && sizes[size] > 0) {
          sizes[size]--;
          setPaper(x, y, size, 0);
          dfs(x, y + size, cnt + 1);
          setPaper(x, y, size, 1);
          sizes[size]++;
        }
      }
    } else {
      dfs(x, y + 1, cnt);
    }
  }

  dfs(0, 0, 0);

  return result === Infinity ? -1 : result;
}
