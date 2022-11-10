function solution(d, budget) {
  let cnt = 0;
  d.sort((a, b) => a - b);
  for (const cost of d) {
    budget -= cost;
    if (budget < 0) break;
    cnt++;
  }
  return cnt;
}
