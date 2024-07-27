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
  const N = Number(input());
  const dp = Array.from({ length: N }, () => Array(10).fill(1));

  for (let i = 1; i < N; i++) {
    for (let j = 8; j >= 0; j--) {
      dp[i][j] = (dp[i][j + 1] + dp[i - 1][j]) % 10007;
    }
  }

  const sum = dp[N - 1].reduce((acc, cur) => (acc + cur) % 10007, 0);
  const answer = sum;
  console.log(answer);
}
