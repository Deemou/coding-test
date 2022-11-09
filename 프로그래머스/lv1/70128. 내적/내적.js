function solution(a, b) {
  let sum = 0;
  a.forEach((num, index) => {
    sum += num * b[index];
  });
  return sum;
}
