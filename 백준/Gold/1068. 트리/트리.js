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
  const info = input().split(" ").map(Number);
  const del = +input();
  const childerenNode = Array.from(Array(n), () => []);
  let root;
  let answer = 0;

  for (let i = 0; i < n; i++) {
    if (info[i] === -1) {
      root = i;
      continue;
    }

    const parent = info[i];
    childerenNode[parent].push(i);
  }

  if (del === root) return 0;

  function dfs(v) {
    if (v === del) {
      return;
    }

    if (!childerenNode[v].length) {
      answer++;
      return;
    }

    for (let child of childerenNode[v]) {
      if (child === del && childerenNode[v].length === 1) {
        answer++;
      }
      dfs(child);
    }
  }

  dfs(root);

  return answer;
}
