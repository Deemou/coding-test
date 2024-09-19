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
  const [M, N] = input().split(" ").map(Number);
  const sizes = Array.from({ length: M }, () => Array(M).fill(1));
  const inits = Array(2 * M - 1).fill(0);

  for (let day = 0; day < N; day++) {
    const growths = input().split(" ").map(Number);
    let cnt = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < growths[i]; j++) {
        inits[cnt++] += i;
      }
    }
  }

  let cnt = 0;
  for (let i = M - 1; i >= 0; i--) {
    sizes[i][0] += inits[cnt++];
  }
  for (let i = 1; i < M; i++) {
    sizes[0][i] += inits[cnt++];
  }

  for (let i = 1; i < M; i++) {
    for (let j = 1; j < M; j++) {
      sizes[i][j] = sizes[i - 1][j];
    }
  }

  return sizes.map((v) => v.join(" ")).join("\n");
}
