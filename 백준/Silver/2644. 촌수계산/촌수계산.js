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
  const n = +input();
  const [p1, p2] = input().split(" ").map(Number);
  const m = +input();
  const relation = Array.from({ length: n + 1 }).map(() => []);
  const visit = Array.from({ length: n + 1 });

  for (let i = 0; i < m; i++) {
    const [x, y] = input().split(" ").map(Number);

    relation[x].push(y);
    relation[y].push(x);
  }

  let ans = -1;
  dfs(p1, 0);
  console.log(ans);

  function dfs(x, cnt) {
    if (x === p2) {
      ans = cnt;
      return;
    }

    for (let i = 0; i < relation[x].length; i++) {
      const next = relation[x][i];
      if (visit[next]) continue;
      visit[next] = true;
      dfs(next, cnt + 1);
      visit[next] = false;
    }
  }
}
