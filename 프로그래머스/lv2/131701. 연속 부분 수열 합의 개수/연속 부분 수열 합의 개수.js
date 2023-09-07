function solution(elements) {
  const set = new Set();
  const length = elements.length;

  for (let i = 1; i <= length; i++) {
    for (let j = 0; j < length; j++) {
      let sum = 0;
      for (let k = j; k < j + i; k++) {
        const n = k % length;
        sum += elements[n];
      }
      set.add(sum);
    }
  }

  return set.size;
}