function solution(n) {
  // n이 홀수일 경우, 블록 채우기 불가
  if (n % 2 === 1) return 0;

  const LIMIT = 5000;
  const MOD = 1000000007;
  const dp = Array(LIMIT + 1).fill(0);
  dp[0] = 1;
  dp[2] = 3;

  // 2칸 전용 블록을 만드는 방법은 3가지, 남은 부분은 (n - 2) * 3이므로 dp[n - 2] * 3
  // x가 4이상의 짝수일 경우, x칸 전용 블록을 만드는 방법은 2가지, 남은 부분은 (n - x) * 2이므로 dp[n - x] * 2
  for (let i = 4; i <= n; i += 2) {
    dp[i] = (dp[i - 2] * 3) % MOD;

    for (let j = 4; j <= i; j += 2) {
      dp[i] = (dp[i] + dp[i - j] * 2) % MOD;
    }
  }

  return dp[n];
}