function solution(n, s) {
  if (n > s) return [-1];

  const answer = [];
  const quotient = Math.floor(s / n);
  const remainder = s % n;

  for (let i = 0; i < n - remainder; i++) {
    answer.push(quotient);
  }
  for (let i = 0; i < remainder; i++) {
    answer.push(quotient + 1);
  }

  return answer;
}
