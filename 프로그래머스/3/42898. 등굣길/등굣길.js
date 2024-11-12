function solution(m, n, puddles) {
  const board = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i < puddles.length; i++) {
    const [x, y] = puddles[i];
    board[x][y] = 1;
  }
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  dp[0][1] = 1;
  const MOD = 1000000007;
  const PUDDLE = 1;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (board[i][j] === PUDDLE) continue;
      dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD;
    }
  }

  return dp[m][n];
}
