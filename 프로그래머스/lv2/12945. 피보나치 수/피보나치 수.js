function solution(n) {
  let fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    const number = (fib[i - 1] + fib[i - 2]) % 1234567;
    fib.push(number);
  }

  return fib[n] % 1234567;
}