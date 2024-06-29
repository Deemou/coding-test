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
  const N = +input();
  const target = +input();
  const maxNum = N * N;
  const matrix = Array.from({ length: N }, () => Array(N).fill(0));
  let num = 1;
  let x = Math.floor(N / 2);
  let y = Math.floor(N / 2);

  matrix[x][y] = num++;

  let layer = 1;
  while (num <= maxNum) {
    // Move up
    for (let i = 0; i < layer; i++) {
      if (num > maxNum) break;
      matrix[--x][y] = num++;
    }
    // Move right
    for (let i = 0; i < layer; i++) {
      if (num > maxNum) break;
      matrix[x][++y] = num++;
    }
    layer++;
    // Move down
    for (let i = 0; i < layer; i++) {
      if (num > maxNum) break;
      matrix[++x][y] = num++;
    }
    // Move left
    for (let i = 0; i < layer; i++) {
      if (num > maxNum) break;
      matrix[x][--y] = num++;
    }
    layer++;
  }

  matrix.forEach((row) => console.log(row.join(" ")));

  let targetPos = [0, 0];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (matrix[i][j] === target) {
        targetPos = [i + 1, j + 1];
        break;
      }
    }
  }

  return targetPos.join(" ");
}
