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
  const t = input();
  const ans = [];
  const maxBeer = 20;
  const unit = 50;

  for (let caseNum = 0; caseNum < t; caseNum++) {
    const n = Number(input());
    let arr = [];
    let graph = [];
    let visited = [];

    for (let i = 0; i < n + 2; i++) {
      graph[i] = [];
      arr.push(input().split(" ").map(Number));
    }

    for (let i = 0; i < n + 2; i++) {
      for (let j = i + 1; j < n + 2; j++) {
        if (getDist(arr[i], arr[j]) <= maxBeer * unit) {
          graph[i].push(j);
          graph[j].push(i);
        }
      }
    }

    visited[0] = true;
    dfs(0);
    if (visited[n + 1] === true) ans[caseNum] = "happy";
    else ans[caseNum] = "sad";

    function dfs(node) {
      if (!graph[node]) return;
      graph[node].forEach((next) => {
        if (visited[next]) return;
        visited[next] = true;
        if (next === n + 1) return;
        dfs(next);
      });
    }
  }

  function getDist(coord1, coord2) {
    return Math.abs(coord1[0] - coord2[0]) + Math.abs(coord1[1] - coord2[1]);
  }

  console.log(ans.join("\n"));
  return;
}
