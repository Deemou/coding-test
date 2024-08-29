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
  const [n, k] = input().split(" ").map(Number);
  const board = [];
  const horses = [];
  const stacks = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => [])
  ); // 말 쌓기 배열 초기화

  // 보드 입력
  for (let i = 0; i < n; i++) {
    const row = input().split(" ").map(Number);
    board.push(row);
  }

  // 말의 초기 위치 입력
  for (let i = 0; i < k; i++) {
    const [x, y, dir] = input().split(" ").map(Number);
    horses.push([x - 1, y - 1, dir - 1]);
    stacks[x - 1][y - 1].push(i);
  }

  for (let turn = 1; turn <= 1000; turn++) {
    for (let i = 0; i < k; i++) {
      const isGameEnd = moveHorse(board, horses, i, stacks);
      if (isGameEnd) return turn;
    }
  }
  return -1;
}

function moveHorse(board, horses, horseIndex, stacks) {
  const WHITE = 0,
    RED = 1,
    BLUE = 2;
  const directions = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ]; // 우, 좌, 상, 하
  let [cx, cy, dir] = horses[horseIndex];
  let [dx, dy] = directions[dir];
  let nx = cx + dx;
  let ny = cy + dy;

  // 다른 말에 업혀있는 경우
  if (stacks[cx][cy][0] !== horseIndex) return false;

  if (isOutOfBound(nx, ny) || isBlueSpace(nx, ny)) {
    dir = dir % 2 === 0 ? dir + 1 : dir - 1; // 방향 반전
    horses[horseIndex][2] = dir;
    [dx, dy] = directions[dir];
    nx = cx + dx;
    ny = cy + dy;

    if (isOutOfBound(nx, ny) || isBlueSpace(nx, ny)) return false;
  }

  // 이동할 위치
  const target = board[nx][ny];
  if (target === WHITE) stacks[nx][ny].push(...stacks[cx][cy]);
  else if (target === RED) stacks[nx][ny].push(...stacks[cx][cy].reverse());

  stacks[cx][cy].forEach((horse) => {
    horses[horse][0] = nx;
    horses[horse][1] = ny;
  });
  stacks[cx][cy] = [];

  // 말이 몇 개 쌓였는지 체크
  if (stacks[nx][ny].length >= 4) return true;

  return false;

  function isOutOfBound(x, y) {
    return x < 0 || y < 0 || x >= board.length || y >= board.length;
  }

  function isBlueSpace(x, y) {
    return board[x][y] === BLUE;
  }
}
