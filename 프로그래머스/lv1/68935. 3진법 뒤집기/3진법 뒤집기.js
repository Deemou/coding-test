function solution(n) {
  const arr = [];
  const RADIX = 3;
  while (n !== 0) {
    arr.unshift(n % RADIX);
    n = Math.floor(n / RADIX);
  }
  return arr.reduce((acc, cur, index) => acc + cur * Math.pow(RADIX, index), 0);
}
