function solution(s) {
  let [min, max] = [Infinity, -Infinity];
  const nums = s.split(" ");

  for (let i = 0; i < nums.length; i++) {
    min = Math.min(min, nums[i]);
    max = Math.max(max, nums[i]);
  }

  return min + " " + max;
}