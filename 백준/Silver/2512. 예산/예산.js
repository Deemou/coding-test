const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const readline = require("readline");
let line = 0;
let stdin = [];
const input = () => stdin[line++];

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    stdin.push(line);
  }).on("close", () => {
    solution();
    process.exit();
  });
}

readFile(filePath);

function solution() {
  const n = +input();
  const requests = input().split(" ").map(Number);
  const budget = +input();

  let low = 1;
  let high = Math.max(...requests);
  let ans;
  let mid;

  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    let left = budget;

    for (let i = 0; i < n; i++) {
      if (requests[i] > mid) left -= mid;
      else left -= requests[i];
      if (left < 0) break;
    }

    if (left >= 0) {
      ans = mid;
      low = mid + 1;
    } else high = mid - 1;
  }
  console.log(ans);
}
