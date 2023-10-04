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
  const n = +input();
  const times = [];

  for (let i = 0; i < n; i++) {
    const time = input().split(" ").map(Number);
    times.push(time);
  }

  times.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    else return a[1] - b[1];
  });

  const stack = [times[0]];

  for (let i = 1; i < n; i++) {
    const [aStart, aEnd] = stack.at(-1);
    const [bStart, bEnd] = times[i];
    if (bEnd < aEnd) {
      stack.pop();
      stack.push(times[i]);
    } else if (bStart >= aEnd) {
      stack.push(times[i]);
    }
  }

  return stack.length;
}
