function solution(money) {
  const n = money.length;
  // 첫 번째 집 포함
  const dp1 = Array(n).fill(0);
  // 첫 번째 집 미포함
  const dp2 = Array(n).fill(0);

  dp1[0] = money[0];
  dp1[1] = money[0];
  dp2[1] = money[1];

  for (let i = 2; i < n - 1; i++) {
    dp1[i] = Math.max(dp1[i - 2] + money[i], dp1[i - 1]);
  }
  for (let i = 2; i < n; i++) {
    dp2[i] = Math.max(dp2[i - 2] + money[i], dp2[i - 1]);
  }

  let max1 = 0;
  let max2 = 0;

  for (let i = 0; i < n; i++) {
    max1 = Math.max(max1, dp1[i]);
    max2 = Math.max(max2, dp2[i]);
  }

  return Math.max(max1, max2);
}
