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
  const [h, w, x, y] = input().split(" ").map(Number);
  const B = Array.from({ length: h + x }, () => input().split(" ").map(Number));
  const A = B.slice(0, h).map((col) => col.slice(0, w));

  for (let i = x; i < h; i++) {
    for (let j = y; j < w; j++) {
      A[i][j] -= A[i - x][j - y];
    }
  }

  for (let i = 0; i < h; i++) {
    console.log(A[i].join(" "));
  }
}
