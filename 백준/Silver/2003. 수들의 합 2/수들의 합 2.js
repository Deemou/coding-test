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
  const [N, M] = input().split(" ").map(Number);
  const A = input().split(" ").map(Number);
  let cnt = 0;
  let start = 0;
  let end = 0;
  let sum = 0;

  while (end <= N) {
    if (sum === M) {
      cnt++;
      sum -= A[start];
      start++;
    } else if (sum < M) {
      sum += A[end];
      end++;
    } else {
      sum -= A[start];
      start++;
    }
  }

  return cnt;
}
