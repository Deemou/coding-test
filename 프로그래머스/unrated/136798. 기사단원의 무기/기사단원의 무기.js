function solution(number, limit, power) {
  let totalIron = 0;
  for (let i = 1; i <= number; i++) {
    const numberOfDivisors = getNumberOfDivisors(i);
    totalIron += numberOfDivisors > limit ? power : numberOfDivisors;
  }
  return totalIron;
}

function getNumberOfDivisors(number) {
  let count = 0;
  for (let i = 1; i <= number; i++) {
    if (number % i == 0) count++;
  }
  return count;
}
