function solution(k, m, score) {
  let minScoreIndex = m - 1;
  let sum = 0;
  score.sort((a, b) => b - a);
  for (minScoreIndex; minScoreIndex < score.length; minScoreIndex += m) {
    const price = score[minScoreIndex] * m;
    sum += price;
  }
  return sum;
}
