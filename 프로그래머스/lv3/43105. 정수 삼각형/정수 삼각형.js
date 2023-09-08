function solution(triangle) {
  const length = triangle.length;
  const answer = Array.from({ length: length }).fill(0);

  answer[0] = triangle[0][0];

  for (let i = 1; i < length; i++) {
    for (let j = i; j > 0; j--) {
      answer[j] = Math.max(answer[j], answer[j - 1] + triangle[i][j]);
      answer[j - 1] = Math.max(
        answer[j - 1],
        answer[j - 1] + triangle[i][j - 1]
      );
    }
  }

  return Math.max(...answer);
}