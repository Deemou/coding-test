function solution() {
  const fs = require("fs");
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "./example.txt";
  const input = fs.readFileSync(filePath).toString().trim().split("\n");
  const n = +input.shift();
  const dx = [0, -1, 0, 1];
  const dy = [1, 0, -1, 0];
  const boardX = [];
  const visited = Array.from({ length: n }).map(() =>
    Array.from({ length: n }).fill(false)
  );
  for (let i = 0; i < n; i++) {
    boardX.push(input[i]);
  }

  let groupX = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visited[i][j]) continue;
      visited[i][j] = true;
      bfs(i, j);
      groupX++;
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      visited[i][j] = false;
    }
  }

  for (let i = 0; i < n; i++) {
    input[i] = input[i].replace(/R/g, "G");
  }

  let groupO = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visited[i][j]) continue;
      visited[i][j] = true;
      bfs(i, j);
      groupO++;
    }
  }

  function bfs(x, y) {
    const queue = [[x, y]];
    while (queue.length) {
      const [cx, cy] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];
        if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
        if (visited[nx][ny]) continue;
        if (input[cx][cy] !== input[nx][ny]) continue;
        visited[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }
  }

  console.log(groupX, groupO);
}

solution();
