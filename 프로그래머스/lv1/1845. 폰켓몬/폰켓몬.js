function solution(nums) {
  const uniqueNums = nums.reduce(
    (uniqueNums, num) => uniqueNums.add(num),
    new Set()
  );
  return Math.min(nums.length / 2, uniqueNums.size);
}
