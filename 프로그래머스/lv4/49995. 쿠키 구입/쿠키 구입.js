function solution(cookie) {
  let sum = 0;
  for (let i of cookie) {
    sum += i;
  }
  const max = Math.floor(sum / 2);
  let ans = 0;

  for (let i = 1; i < cookie.length; i++) {
    let l = i - 1,
      r = i,
      sum1 = cookie[l],
      sum2 = cookie[r];
    while (true) {
      if (sum1 === sum2) {
        ans = Math.max(ans, sum1);
        r++;
        l--;
        if (l < 0 || r === cookie.length) break;
        sum1 += cookie[l];
        sum2 += cookie[r];
      } else if (sum1 > sum2) {
        r++;
        if (r === cookie.length) break;
        sum2 += cookie[r];
      } else {
        l--;
        if (l < 0) break;
        sum1 += cookie[l];
      }
    }
    if (ans === max) return max;
  }
  return ans;
}
