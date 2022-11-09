function solution(matrix1, matrix2) {
  return matrix1.map((arr, row) =>
    arr.map((elem, col) => elem + matrix2[row][col])
  );
}
