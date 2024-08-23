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
  const answer = [];

  for (let tc = 1; tc <= n; tc++) {
    const result = solve();
    const str = `Data set ${tc}: ${result}`;
    answer.push(str);
  }

  return answer.join("\n");
}

function solve() {
  const [s1, s2, s3] = input().split(" ");
  const n = s1.length;
  const m = s2.length;
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(false));
  dp[0][0] = true;
  // dp[n][m] 은 s1 앞 n자리와 s2 앞 m 자리를 사용해 s3 앞 n + m 자리를 만들 수 있는지 여부를 나타냄

  for (let i = 1; i <= n; i++) {
    if (!dp[i - 1][0]) break;
    dp[i][0] = s1[i - 1] === s3[i - 1];
  }

  for (let j = 1; j <= m; j++) {
    if (!dp[0][j - 1]) break;
    dp[0][j] = s2[j - 1] === s3[j - 1];
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] =
        (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) ||
        (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]);
    }
  }

  return dp[n][m] ? "yes" : "no";
}
