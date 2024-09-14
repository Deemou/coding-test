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
  const MAX_DICE_VALUE = 6;
  const dices = Array.from({ length: N + 1 }, () =>
    Array(MAX_DICE_VALUE + 1).fill(0)
  );
  // dp[i][j] = i번째 주사위의 밑면이 j일 때 옆면의 숫자 합의 최댓값
  const dp = Array.from({ length: N + 1 }, () =>
    Array(MAX_DICE_VALUE + 1).fill(0)
  );
  const diceValues = [1, 2, 3, 4, 5, 6];
  for (let i = 1; i <= N; i++) {
    const [A, B, C, D, E, F] = input().split(" ").map(Number);
    const dice = dices[i];
    dice[A] = F;
    dice[B] = D;
    dice[C] = E;
    dice[D] = B;
    dice[E] = C;
    dice[F] = A;
  }

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= MAX_DICE_VALUE; j++) {
      const acc = dp[i - 1][dices[i - 1][j]];
      const curMaxSideVal = Math.max(
        ...diceValues.filter((v) => v !== j && v !== dices[i][j])
      );
      dp[i][j] = acc + curMaxSideVal;
    }
  }

  return Math.max(...dp[N]);
}
