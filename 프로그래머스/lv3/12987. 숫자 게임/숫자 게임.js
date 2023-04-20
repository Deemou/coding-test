function solution(A, B) {
  let cnt = 0;
  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);
  let i = 0,
    j = 0;
  while (j !== B.length) {
    if (A[i] < B[j]) {
      cnt++;
      i++;
    }
    j++;
  }
  return cnt;
}
