const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const readline = require("readline");
let line = 0;
let stdin = [];
const input = () => stdin[line++];

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    stdin.push(line);
  }).on("close", () => {
    solution();
    process.exit();
  });
}

readFile(filePath);

function solution() {
  const [N, M, H] = input().split(" ").map(Number);
  let ans = 4;
  const ladder = Array.from({ length: H + 1 }).map(() =>
    Array.from({ length: N })
  );
  for (let i = 0; i < M; i++) {
    const [a, b] = input().split(" ").map(Number);
    ladder[a][b] = true;
  }

  setLadder(1, 1, 0);

  console.log(ans <= 3 ? ans : -1);

  function setLadder(r, c, cnt) {
    if (cnt > 3) return;
    if (check()) {
      ans = Math.min(ans, cnt);
      return;
    }

    for (let j = c; j < N; j++) {
      addPossible(r, j, cnt);
    }

    for (let i = r + 1; i <= H; i++) {
      for (let j = 1; j < N; j++) {
        addPossible(i, j, cnt);
      }
    }
  }

  function check() {
    for (let i = 1; i <= N; i++) {
      let lane = i;
      for (let j = 1; j <= H; j++) {
        if (ladder[j][lane]) lane++;
        else if (ladder[j][lane - 1]) lane--;
      }
      if (lane !== i) return false;
    }
    return true;
  }

  function addPossible(i, j, cnt) {
    if (ladder[i][j] || ladder[i][j - 1] || ladder[i][j + 1]) return;
    ladder[i][j] = true;
    setLadder(i, j + 2, cnt + 1);
    ladder[i][j] = false;
  }
}
