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
  const MAX = 100;
  const [n, m] = input().split(" ").map(Number);
  const board = Array(MAX + 1).fill(Infinity);
  for (let i = 0; i < n + m; i++) {
    const [from, to] = input().split(" ").map(Number);
    board[from] = to;
  }
  const dp = Array(MAX + 1).fill(Infinity);
  dp[1] = 0;
  let i = 2;

  while (i <= MAX) {
    for (let j = 1; j <= 6; j++) {
      const prev = i - j;
      if (prev < 1) continue;
      // 이전 위치가 사다리칸 또는 뱀칸인 경우 패스
      if (board[prev] !== Infinity) continue;
      dp[i] = Math.min(dp[i], dp[prev] + 1);
    }

    const next = board[i];
    // 일반 칸
    if (next === Infinity) {
      i++;
    }
    //사다리
    else if (next > i) {
      dp[next] = Math.min(dp[next], dp[i]);
      i++;
    }
    // 뱀
    else if (next < i && dp[next] > dp[i]) {
      dp[next] = dp[i];
      i = next;
    } else i++;
  }

  return dp[MAX];
}
