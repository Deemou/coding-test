function solution(board, skill) {
  const n = board.length;
  const m = board[0].length;
  const damage = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  let result = 0;

  skill.forEach(([type, r1, c1, r2, c2, degree]) => {
    const effect = type === 1 ? -degree : degree;
    damage[r1][c1] += effect;
    damage[r1][c2 + 1] -= effect;
    damage[r2 + 1][c1] -= effect;
    damage[r2 + 1][c2 + 1] += effect;
  });

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      damage[i][j + 1] += damage[i][j];
    }
  }

  for (let j = 0; j < m; j++) {
    for (let i = 0; i < n; i++) {
      damage[i + 1][j] += damage[i][j];
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] + damage[i][j] > 0) result++;
    }
  }

  return result;
}
