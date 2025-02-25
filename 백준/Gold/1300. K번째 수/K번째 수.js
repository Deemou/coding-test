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
  const n = Number(input());
  const k = Number(input());

  let start = 1,
    end = k;

  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    if (countLessOrEqual(mid) < k) start = mid + 1;
    else end = mid;
  }

  return start;

  function countLessOrEqual(x) {
    let cnt = 0;
    for (let i = 1; i <= n; i++) {
      cnt += Math.min(n, Math.floor(x / i));
    }

    return cnt;
  }
}
