function solution(elements) {
  const set = new Set();
  const length = elements.length;

  for (let i = 0; i < length; i++) {
    let sum = 0;
    for (let j = 0; j < length; j++) {
      const n = (i + j) % length;
      sum += elements[n];
      set.add(sum);
    }
  }

  return set.size;
}