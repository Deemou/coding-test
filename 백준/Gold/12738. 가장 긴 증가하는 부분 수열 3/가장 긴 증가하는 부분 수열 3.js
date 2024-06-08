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
  const A = input().split(" ").map(Number);
  const lis = [A[0]];

  for (let i = 1; i < N; i++) {
    if (A[i] < lis[0]) lis[0] = A[i];
    else if (A[i] > lis[lis.length - 1]) lis.push(A[i]);
    else {
      let low = 0,
        high = lis.length - 1;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (lis[mid] >= A[i]) high = mid - 1;
        else low = mid + 1;
      }

      lis[low] = A[i];
    }
  }

  return lis.length;
}
