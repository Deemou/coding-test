function solution(numbers) {
  let arr = [];
  const numArr = numbers.split('');

  for (let i = 1; i <= numbers.length; i++) {
    const permutations = getPermutations(numArr, i);
    arr = arr.concat(permutations.map((v) => Number(v)).filter((v) => isPrime(v)));
  }

  const set = new Set([...arr]);
  return set.size;
}

function getPermutations(numbers, length) {
  const arr = [];
  if (length === 1) return numbers;

  numbers.forEach((fixed, idx) => {
    const rest = numbers.filter((_, index) => idx !== index);
    const permutations = getPermutations(rest, length - 1);
    const arranged = permutations.map((v) => [fixed, v].join(''));
    arr.push(...arranged);
  });
  return arr;
}

function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i == 0) return false;
  }
  return true;
}