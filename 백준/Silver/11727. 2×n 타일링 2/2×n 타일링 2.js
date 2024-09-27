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
  const N = Number(input());
  const divisor = 10007;
  const dp = [0, 1, 3];
  // 2x1 타일을 놓는 경우, 남은 부분은 2x(n-1)이므로 dp[n-1]
  // 1x2 타일을 놓는 경우, 남은 부분은 2x(n-2)이므로 dp[n-2]
  // 2x2 타일을 놓는 경우, 남은 부분은 2x(n-2)이므로 dp[n-2]
  for (let i = 3; i <= N; i++) {
    dp[i] = (dp[i - 1] + 2 * dp[i - 2]) % divisor;
  }

  return dp[N];
}
