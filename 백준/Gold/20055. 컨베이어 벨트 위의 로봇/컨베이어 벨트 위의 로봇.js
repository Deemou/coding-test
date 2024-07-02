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
  const [N, K] = input().split(" ").map(Number);
  const belt = input().split(" ").map(Number);
  const robots = Array(2 * N).fill(false);
  let zeroCnt = 0;
  let step = 0;

  while (zeroCnt < K) {
    belt.unshift(belt.pop());
    robots.unshift(robots.pop());
    robots[N - 1] = false;

    for (let i = N - 2; i >= 0; i--) {
      if (!robots[i]) continue;
      if (robots[i + 1]) continue;
      if (belt[i + 1] === 0) continue;

      robots[i] = false;
      robots[i + 1] = true;
      belt[i + 1]--;

      if (belt[i + 1] === 0) zeroCnt++;
    }
    robots[N - 1] = false;

    if (belt[0] > 0) {
      robots[0] = true;
      belt[0]--;
      if (belt[0] === 0) zeroCnt++;
    }

    step++;
  }

  return step;
}
