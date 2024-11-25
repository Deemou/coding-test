function solution(n, k) {
  const answer = [];
  const numbers = Array.from({ length: n }, (_, i) => i + 1);
  k--; // 0-based indexing

  while (n > 0) {
    const factorial = factorials(n - 1);
    const index = Math.floor(k / factorial);
    answer.push(numbers[index]);
    numbers.splice(index, 1);
    k %= factorial;
    n--;
  }

  return answer;
}

function factorials(num) {
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
}