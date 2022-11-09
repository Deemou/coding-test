function solution(n) {
  const arr = [];
  const DIVISIOR = 3;
  while (n > 0) {
    const remainder = n % DIVISIOR;
    arr.push(remainder);
    n = Math.floor(n / DIVISIOR);
  }

  let sum = 0;
  arr.forEach((elem, index) => {
    sum += elem * Math.pow(DIVISIOR, arr.length - 1 - index);
  });
  return sum;
}
