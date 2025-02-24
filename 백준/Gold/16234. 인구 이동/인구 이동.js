const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const readline = require("readline");
let line = 0;
const lines = [];
const input = () => lines[line++];

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    lines.push(line);
  }).on("close", () => {
    console.log(solution());
    process.exit();
  });
}

readFile(filePath);

function solution() {
  const [N, L, R] = input().split(" ").map(Number);
  const A = Array.from({ length: N }, () => input().split(" ").map(Number));
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  let days = 0;

  while (true) {
    let moved = false;

    for (let i = 0; i < N; i++) {
      visited[i].fill(false);
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (visited[i][j]) continue;
        const union = [];
        visited[i][j] = true;
        const population = dfs(i, j, union);

        if (union.length > 1) {
          redistributePopulation(union, population);
          moved = true;
        }
      }
    }

    if (!moved) break;
    days++;
  }

  return days;

  function dfs(x, y, union) {
    union.push([x, y]);
    let population = A[x][y];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (!isValidCoord(nx, ny)) continue;
      if (visited[nx][ny]) continue;
      if (!canUnite(x, y, nx, ny)) continue;

      visited[nx][ny] = true;
      population += dfs(nx, ny, union);
    }

    return population;
  }

  function isValidCoord(x, y) {
    return x >= 0 && x < N && y >= 0 && y < N;
  }

  function canUnite(x, y, nx, ny) {
    const diff = Math.abs(A[x][y] - A[nx][ny]);
    return diff >= L && diff <= R;
  }

  function redistributePopulation(union, totalPopulation) {
    const newPopulation = Math.floor(totalPopulation / union.length);
    for (const [x, y] of union) {
      A[x][y] = newPopulation;
    }
  }
}
