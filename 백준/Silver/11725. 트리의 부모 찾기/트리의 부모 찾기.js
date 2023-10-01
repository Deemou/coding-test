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

  for (let i = 0; i < n - 1; i++) {
    const [a, b] = input().split(" ").map(Number);
    graph[a].push(b);
    graph[b].push(a);
  }

  const visited = Array(n + 1).fill(false);
  const parents = Array(n + 1).fill(0);

  function dfs(node) {
    visited[node] = true;

    for (let nextNode of graph[node]) {
      if (!visited[nextNode]) {
        parents[nextNode] += node;
        dfs(nextNode);
      }
    }
  }

  dfs(1);

  return parents.slice(2).join("\n");
}
