const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const readline = require("readline");
let line = 0;
let stdin = [];
const input = () => stdin[line++];

readFile(filePath);

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    stdin.push(line);
  }).on("close", () => {
    console.log(solution());
    process.exit();
  });
}

function solution() {
  const [N, M] = input().split(" ").map(Number);
  const cheese = [];
  for (let i = 0; i < N; i++) {
    cheese.push(input().split(" ").map(Number));
  }

  let cntCheese = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (cheese[i][j] === 1) cntCheese++;
    }
  }

  const dx = [0, -1, 0, 1];
  const dy = [1, 0, -1, 0];

  let time = 0;

  while (cntCheese > 0) {
    const outerCheese = [];
    const numberOfAirWithCheese = Array.from(Array(N), () =>
      new Array(M).fill(0)
    );
    const visitedAir = Array.from(Array(N), () => new Array(M).fill(false));
    visitedAir[0][0] = true;
    const queueAir = [[0, 0]];
    let front = 0;

    // 외부공기 BFS
    while (queueAir.length !== front) {
      let [cx, cy] = queueAir[front];
      front++;

      for (let dir = 0; dir < 4; dir++) {
        const nx = cx + dx[dir],
          ny = cy + dy[dir];

        if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

        if (cheese[nx][ny]) {
          if (numberOfAirWithCheese[nx][ny] === 0) outerCheese.push([nx, ny]);
          numberOfAirWithCheese[nx][ny]++;
          continue;
        }

        if (visitedAir[nx][ny]) continue;
        visitedAir[nx][ny] = true;

        queueAir.push([nx, ny]);
      }
    }

    // 치즈 녹이기
    for (let i = 0; i < outerCheese.length; i++) {
      const [x, y] = outerCheese[i];
      if (numberOfAirWithCheese[x][y] < 2) continue;
      cheese[x][y] = 0;
      cntCheese--;
    }

    time++;
  }

  return time;
}
