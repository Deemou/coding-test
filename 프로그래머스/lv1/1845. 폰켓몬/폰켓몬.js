function solution(nums) {
  const uniqueNums = new Set(nums);
  return Math.min(uniqueNums.size, nums.length / 2);
}
