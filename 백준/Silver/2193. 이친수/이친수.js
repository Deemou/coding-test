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
  if (N <= 2) return 1;
  const dp = Array(N + 1).fill(BigInt(0));
  dp[1] = BigInt(1); // 1
  dp[2] = BigInt(1); // 10

  // n-1자리 이친수에 0을 추가한 경우 (이친수의 끝이 0)
  // n-2자리 이친수에 01을 추가한 경우 (이친수의 끝이 1)
  for (let i = 3; i <= N; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[N].toString();
}
