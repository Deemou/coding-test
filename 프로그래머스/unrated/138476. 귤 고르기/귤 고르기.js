function solution(k, tangerine) {
  const nums = [];
  const map = new Map();

  for (let i = 0; i < tangerine.length; i++) {
    const cnt = map.get(tangerine[i]) || 0;
    map.set(tangerine[i], cnt + 1);
  }

  for (let [k, v] of map) {
    nums.push(k);
  }
  nums.sort((a, b) => {
    return map.get(b) - map.get(a);
  });

  let answer = 0;
  let i = 0;
    
  while (k > 0) {
    k -= map.get(nums[i]);
    answer++;
    i++;
  }

  return answer;
}