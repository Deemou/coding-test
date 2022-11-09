function solution(a, b) {
  let sum = 0;
  const max = Math.max(a, b);
  const min = Math.min(a, b);
  for (let num = min; num <= max; num++) {
    sum += num;
  }
  return sum;
}
