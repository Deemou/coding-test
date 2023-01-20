function solution(k, dungeons) {
  let answer = -1;
  const length = dungeons.length;
  const arr = [];

  for (let i = 0; i < length; i++) {
    arr.push(i.toString());
  }

  const permutations = getPermutations(arr, length);
  permutations.forEach((permutation) => {
    let count = 0;
    let energy = k;
    for (let i = 0; i < permutation.length; i++) {
      const order = permutation[i];
      const [minimum, used] = dungeons[order];
      if (energy < minimum) break;
      count++;
      energy -= used;
    }
    answer = Math.max(answer, count);
  });
  return answer;
}

function getPermutations(numbers, length) {
  if (length === 1) return numbers;

  const arr = [];

  numbers.forEach((fixed, idx) => {
    const rest = numbers.filter((_, index) => index !== idx);
    const permutations = getPermutations(rest, length - 1);
    const arranged = permutations.map((v) => [fixed, v].join(''));
    arr.push(...arranged);
  });
  return arr;
}