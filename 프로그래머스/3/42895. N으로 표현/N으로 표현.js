function solution(N, number) {
  const MAX_N_LIMIT = 8;
  const dp = Array.from({ length: MAX_N_LIMIT + 1 }, () => new Set());

  for (let i = 1; i <= MAX_N_LIMIT; i++) {
    dp[i].add(Number(String(N).repeat(i)));

    for (let j = 1; j < i; j++) {
      for (const a of dp[j]) {
        for (const b of dp[i - j]) {
          dp[i].add(a + b);
          dp[i].add(a - b);
          dp[i].add(a * b);
          if (b != 0) dp[i].add(Math.floor(a / b));
        }
      }
    }
    if (dp[i].has(number)) return i;
  }

  return -1;
}
