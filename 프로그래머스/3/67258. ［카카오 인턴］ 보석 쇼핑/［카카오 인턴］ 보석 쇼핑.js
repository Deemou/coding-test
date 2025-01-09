function solution(gems) {
  const gemTypes = new Set(gems).size;
  const gemCount = new Map();
  let left = 0,
    right = 0;
  let minLength = Infinity;
  let result = [0, gems.length - 1];

  while (right < gems.length) {
    const gem = gems[right];
    gemCount.set(gem, (gemCount.get(gem) || 0) + 1);
    right++;

    while (gemCount.size === gemTypes) {
      const length = right - left;
      if (length < minLength) {
        minLength = length;
        result = [left + 1, right];
      }

      gemCount.set(gems[left], gemCount.get(gems[left]) - 1);
      if (gemCount.get(gems[left]) === 0) gemCount.delete(gems[left]);
      left++;
    }
  }

  return result;
}
