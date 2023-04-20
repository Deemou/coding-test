function solution(d, budget) {
  const sorted = d.slice().sort((a, b) => a - b);
  let cnt = 0;
  for (let price of sorted) {
    budget -= price;
    if (budget < 0) return cnt;
    cnt++;
  }
  return cnt;
}