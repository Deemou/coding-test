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
    solution();
    process.exit();
  });
}

function solution() {
  const n = +input();
  let numbers = new Array(n + 1);

  for (let i = 1; i <= n; i++) {
    numbers[i] = +input();
  }

  let visited = new Array(n + 1);
  let finished = new Array(n + 1);
  let result = [];

  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }

  result.sort((a, b) => a - b);
  console.log(result.length + "\n" + result.join("\n"));

  function dfs(v) {
    visited[v] = true;

    let next = numbers[v];

    if (!visited[next]) {
      dfs(next);
    } else if (!finished[next]) {
      let cur = next;

      while (cur !== v) {
        result.push(cur);
        cur = numbers[cur];
      }
      result.push(v);
    }

    finished[v] = true;
  }
}
