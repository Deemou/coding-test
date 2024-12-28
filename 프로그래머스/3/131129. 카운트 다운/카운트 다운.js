function solution(target) {
  const scores = [];

  for (let i = 1; i <= 20; i++) {
    scores.push(i);
    scores.push(i * 2);
    scores.push(i * 3);
  }
  scores.push(50);

  const dp = Array.from({ length: target + 1 }, () => [Infinity, 0]);
  dp[0] = [0, 0];

  for (let i = 1; i <= target; i++) {
    for (const score of scores) {
      if (i < score) continue;
      const [darts, singles] = dp[i - score];
      const newDarts = darts + 1;
      const newSingleOrBulls = singles + (score === 50 || score <= 20 ? 1 : 0);

      if (newDarts < dp[i][0]) dp[i] = [newDarts, newSingleOrBulls];
      else if (newDarts === dp[i][0])
        dp[i][1] = Math.max(dp[i][1], newSingleOrBulls);
    }
  }

  return dp[target];
}
