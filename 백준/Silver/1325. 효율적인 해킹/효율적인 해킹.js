const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
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
  const graph = Array.from(Array(N + 1), () => []);
  const visited = Array(N + 1);

  for (let i = 0; i < M; i++) {
    let [A, B] = input().split(" ").map(Number);
    graph[B].push(A); //B를 해킹하면 A도 해킹 가능
  }

  let maxCnt = -1;
  let answer = [];

  function bfs(start) {
    visited.fill(false);
    visited[start] = true;
    const queue = [start];
    let front = 0;
    let cnt = 1; //현재 노드 포함

    while (queue.length !== front) {
      const current = queue[front];
      front++;

      for (let i = 0; i < graph[current].length; i++) {
        const next = graph[current][i];
        if (visited[next]) continue;
        visited[next] = true;
        queue.push(next);
        cnt++;
      }
    }

    return cnt;
  }

  for (let startNode = 1; startNode <= N; startNode++) {
    const cnt = bfs(startNode);

    if (cnt > maxCnt) {
      maxCnt = cnt;
      answer = [startNode];
    } else if (cnt === maxCnt) {
      answer.push(startNode);
    }
  }

  return answer.join(" ");
}
