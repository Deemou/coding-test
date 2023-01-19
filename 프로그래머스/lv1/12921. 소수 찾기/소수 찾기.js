function solution(n) {
  const arr = [];

  arr.push(2);
  for (let i = 3; i <= n; i += 2) {
    arr.push(i);
    for (let j = 3; j <= Math.sqrt(i); j += 2) {
      if (i % j == 0) {
        arr.pop();
        break;
      }
    }
  }
  return arr.length;
}