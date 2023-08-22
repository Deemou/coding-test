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
  const m = +input();
  const relation = Array.from({ length: n + 1 }).map(() => []);
  const visit = Array.from({ length: n + 1 });

  for (let i = 0; i < m; i++) {
    const [x, y] = input().split(" ").map(Number);

    relation[x].push(y);
    relation[y].push(x);
  }

  let ans = 0;
  visit[1] = true;
  dfs(1);
  console.log(ans);

  function dfs(x) {
    for (let i = 0; i < relation[x].length; i++) {
      const next = relation[x][i];
      if (visit[next]) continue;
      ans++;
      visit[next] = true;
      dfs(next);
    }
  }
}
