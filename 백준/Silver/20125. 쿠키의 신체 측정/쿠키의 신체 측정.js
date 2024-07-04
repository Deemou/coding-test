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
  // 1. 심장의 위치를 찾는다. 머리 아래
  // 2. 각 신체의 길이를 잰다.
  // 3. 허리 가장 아래 위치를 찾고, 대각선 아래가 각 다리 시작

  const N = +input();
  const board = Array.from({ length: N }, () => input().split(""));
  let heartX = -1,
    heartY = -1;
  const UNDERBAR = "_";

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] === UNDERBAR) continue;
      heartX = i + 1;
      heartY = j;
      break;
    }
    if (heartX !== -1) break;
  }

  let leftArm = 0,
    rightArm = 0,
    waist = 0,
    leftLeg = 0,
    rightLeg = 0;

  // 왼팔
  for (let j = heartY - 1; j >= 0; j--) {
    if (board[heartX][j] === UNDERBAR) break;
    leftArm++;
  }

  // 오른팔
  for (let j = heartY + 1; j < N; j++) {
    if (board[heartX][j] === UNDERBAR) break;
    rightArm++;
  }

  // 허리
  for (let i = heartX + 1; i < N; i++) {
    if (board[i][heartY] === UNDERBAR) break;
    waist++;
  }

  // 왼다리
  for (let i = heartX + waist + 1; i < N; i++) {
    if (board[i][heartY - 1] === UNDERBAR) break;
    leftLeg++;
  }

  // 오른다리
  for (let i = heartX + waist + 1; i < N; i++) {
    if (board[i][heartY + 1] === UNDERBAR) break;
    rightLeg++;
  }

  console.log(heartX + 1, heartY + 1);
  return [leftArm, rightArm, waist, leftLeg, rightLeg].join(" ");
}
