function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;
  const dist = Array(n)
    .fill()
    .map(() => Array(m).fill(-1));
  const queue = [];
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];
  dist[0][0] = 1;
  queue.push([0, 0]);

  while (queue.length !== 0) {
    const [x, y] = queue.shift();
    if ([x, y] === [n - 1, m - 1]) return dist[x][y];
    for (let dir = 0; dir < 4; dir++) {
      const newX = x + dx[dir];
      const newY = y + dy[dir];
      if (newX < 0 || newX >= n) continue;
      if (newY < 0 || newY >= m) continue;
      if (dist[newX][newY] !== -1) continue;
      if (maps[newX][newY] === 0) continue;
      dist[newX][newY] = dist[x][y] + 1;
      queue.push([newX, newY]);
    }
  }

  return dist[n - 1][m - 1];
}