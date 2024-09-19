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

  for (let day = 0; day < N; day++) {
    const [zero, one, two] = input().split(" ").map(Number);
    const zeros = Array(zero).fill(0),
      ones = Array(one).fill(1),
      twos = Array(two).fill(2),
      nums = [...zeros, ...ones, ...twos];
    const growths = Array.from({ length: M }, () => Array(M));

    let cnt = 0;
    for (let i = M - 1; i >= 0; i--) {
      growths[i][0] = nums[cnt++];
    }
    for (let i = 1; i < M; i++) {
      growths[0][i] = nums[cnt++];
    }
    for (let i = 1; i < M; i++) {
      for (let j = 1; j < M; j++) {
        growths[i][j] = growths[i - 1][j];
      }
    }

    for (let i = 0; i < M; i++) {
      for (let j = 0; j < M; j++) {
        sizes[i][j] += growths[i][j];
      }
    }
  }

  return sizes.map((v) => v.join(" ")).join("\n");
}
