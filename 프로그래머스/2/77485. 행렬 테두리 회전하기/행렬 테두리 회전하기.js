function solution(rows, columns, queries) {
  const matrix = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: columns }, (_, j) => i * columns + j + 1)
  );
  const answer = [];

  for (const [x1, y1, x2, y2] of queries) {
    const temp = matrix[x1 - 1][y1 - 1];
    let minValue = temp;

    // 왼쪽
    for (let i = x1 - 1; i < x2 - 1; i++) {
      matrix[i][y1 - 1] = matrix[i + 1][y1 - 1];
      minValue = Math.min(minValue, matrix[i][y1 - 1]);
    }

    // 아래쪽
    for (let i = y1 - 1; i < y2 - 1; i++) {
      matrix[x2 - 1][i] = matrix[x2 - 1][i + 1];
      minValue = Math.min(minValue, matrix[x2 - 1][i]);
    }

    // 오른쪽
    for (let i = x2 - 1; i > x1 - 1; i--) {
      matrix[i][y2 - 1] = matrix[i - 1][y2 - 1];
      minValue = Math.min(minValue, matrix[i][y2 - 1]);
    }

    // 위쪽
    for (let i = y2 - 1; i > y1 - 1; i--) {
      matrix[x1 - 1][i] = matrix[x1 - 1][i - 1];
      minValue = Math.min(minValue, matrix[x1 - 1][i]);
    }

    matrix[x1 - 1][y1] = temp;
    answer.push(minValue);
  }

  return answer;
}
