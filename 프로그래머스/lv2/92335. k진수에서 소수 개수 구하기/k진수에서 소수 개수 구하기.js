function solution(n, k) {
  let answer = 0;
  const nums = n.toString(k).split("0");

  for (let num of nums) {
    if (isPrime(+num)) answer++;
  }

  return answer;

  function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
}
