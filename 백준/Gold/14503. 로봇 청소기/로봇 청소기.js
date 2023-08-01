function solution() {
  const fs = require("fs");
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "./example.txt";
  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split("\n")
    .map((v) => v.split(" ").map(Number));
  const [n, m] = input[0];
  const [initR, initC, initD] = input[1];
  const board = [...input.slice(2)];
  const visit = Array.from({ length: n }).map(() =>
    Array.from({ length: m }).fill(false)
  );

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  let cnt = 0;
  let curR = initR;
  let curC = initC;
  let curD = initD;
  while (true) {
    if (!visit[curR][curC]) {
      cnt++;
      visit[curR][curC] = true;
    }
    let hasNoDirtyRoom = true;
    for (let i = 0; i < 4; i++) {
      curD = curD === 0 ? 3 : curD - 1;
      const nextR = curR + dr[curD];
      const nextC = curC + dc[curD];
      if (board[nextR][nextC] === 1) continue;
      if (visit[nextR][nextC]) continue;
      curR = nextR;
      curC = nextC;
      hasNoDirtyRoom = false;
      break;
    }
    if (hasNoDirtyRoom) {
      const nextR = curR - dr[curD];
      const nextC = curC - dc[curD];
      if (board[nextR][nextC] === 1) break;
      curR = nextR;
      curC = nextC;
    }
  }
  return cnt;
}

console.log(solution());
