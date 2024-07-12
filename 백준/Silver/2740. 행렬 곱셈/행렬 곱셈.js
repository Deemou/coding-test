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
    solution();
    process.exit();
  });
}

readFile(filePath);

function solution() {
  const [N, M] = input().split(" ").map(Number);
  const A = Array.from({ length: N }, () => input().split(" ").map(Number));
  const [_, K] = input().split(" ").map(Number);
  const B = Array.from({ length: M }, () => input().split(" ").map(Number));

  for (let i = 0; i < N; i++) {
    const row = [];
    for (let j = 0; j < K; j++) {
      let p = 0;
      for (let k = 0; k < M; k++) {
        p += A[i][k] * B[k][j];
      }
      row.push(p);
    }
    console.log(row.join(" "));
  }
}
