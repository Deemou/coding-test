function solution(n) {
  let count = 0;
  while (n > 0) {
    if (n & 1) {
      n--;
      count++;
    }
    n /= 2;
  }
  return count;
}
