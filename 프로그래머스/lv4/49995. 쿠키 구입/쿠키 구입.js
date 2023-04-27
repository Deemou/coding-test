function solution(cookie) {
  let sum = 0;
  for (let i of cookie) {
    sum += i;
  }
  const max = Math.floor(sum / 2);
  let ans = 0;

  for (let i = 1; i < cookie.length; i++) {
    let l = i - 1,
      r = i;
    let sum1 = cookie[l],
      sum2 = cookie[r];
    let pAns = 0;
    while (true) {
      if (sum1 === sum2) {
        pAns = sum1;
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
    if (pAns === max) return max;
    ans = Math.max(ans, pAns);
  }
  return ans;
}
