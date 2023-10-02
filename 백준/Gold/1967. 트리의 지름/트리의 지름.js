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
  const n = +input();
  const graph = Array.from(Array(n + 1), () => []);
  const visited = Array(n + 1).fill(false);
  const dist = Array(n + 1).fill(0);

  for (let i = 1; i < n; i++) {
    const [a, b, c] = input().split(" ").map(Number);
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  }

  function dfs(v, weight) {
    visited[v] = true;
    dist[v] += weight;

    for (let [nextV, nextW] of graph[v]) {
      if (!visited[nextV]) {
        dfs(nextV, weight + nextW);
      }
    }
  }

  // 루트로부터의 거리 계산
  dfs(1, 0);

  let maxDistIndex = dist.indexOf(Math.max(...dist));

  visited.fill(false);
  dist.fill(0);

  // 루트에서 가장 멀리 있는 노드로부터의 거리 계산
  dfs(maxDistIndex, 0);

  return Math.max(...dist);
}
