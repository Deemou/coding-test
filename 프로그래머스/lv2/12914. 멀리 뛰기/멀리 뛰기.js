function solution(n) {
  const arr = [0, 1, 2];
  if (n <= 2) return n;
  for (let i = 3; i <= n; i++) {
    const num = (arr[i - 2] + arr[i - 1]) % 1234567;
    arr.push(num);
  }
  return arr[n];
}
