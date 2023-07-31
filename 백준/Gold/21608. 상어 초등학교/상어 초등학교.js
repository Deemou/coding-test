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
  const [n] = input[0];
  const seats = Array.from({ length: n }).map(() => Array.from({ length: n }));
  const likesList = Array.from({ length: n + 1 });

  const dx = [0, -1, 0, 1];
  const dy = [1, 0, -1, 0];

  const likeSeats = Array.from({ length: n }).map(() =>
    Array.from({ length: n }).fill(0)
  );

  for (let st = 1; st <= n * n; st++) {
    const student = input[st][0];
    const likes = input[st].slice(1);
    likesList[student] = likes;
    arrange(student);
  }

  let totalSatisfaction = 0;
  const satisfactionConverter = [0, 1, 10, 100, 1000];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      totalSatisfaction += calcSatisfaction(i, j);
    }
  }

  return totalSatisfaction;

  function arrange(student) {
    let maxLikesCnt = 0;
    const candidates = [];
    likeSeats.map((row) => row.fill(0));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (seats[i][j]) continue;
        const likesCnt = countLikes(i, j, student);
        likeSeats[i][j] = likesCnt;
        maxLikesCnt = Math.max(maxLikesCnt, likesCnt);
      }
    }
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (seats[i][j]) continue;
        if (likeSeats[i][j] === maxLikesCnt) candidates.push([i, j]);
      }
    }
    let idx = 0;
    let maxEmptyCnt = 0;
    for (let i = 0; i < candidates.length; i++) {
      const [x, y] = candidates[i];
      const emptyCnt = countEmpty(x, y);
      if (emptyCnt > maxEmptyCnt) {
        idx = i;
        maxEmptyCnt = emptyCnt;
      }
    }
    const [x, y] = candidates[idx];
    seats[x][y] = student;
  }

  function countLikes(x, y, student) {
    let cnt = 0;
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
      if (!seats[nx][ny]) continue;
      if (likesList[student].includes(seats[nx][ny])) cnt++;
    }
    return cnt;
  }

  function countEmpty(x, y) {
    let cnt = 0;
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
      if (seats[nx][ny]) continue;
      cnt++;
    }
    return cnt;
  }

  function calcSatisfaction(x, y) {
    const student = seats[x][y];
    const likesCnt = countLikes(x, y, student);
    return satisfactionConverter[likesCnt];
  }
}

console.log(solution());
