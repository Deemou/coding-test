function solution(left, right) {
  let sum = 0;
  for (let n = left; n <= right; n++) {
    if (isDivisorCountEven(n)) sum += n;
    else sum -= n;
  }
  return sum;
}
function isDivisorCountEven(num) {
  let cnt = 0;
  for (let n = 1; n <= num; n++) {
    if (num % n == 0) cnt++;
  }
  return cnt % 2 == 0;
}
