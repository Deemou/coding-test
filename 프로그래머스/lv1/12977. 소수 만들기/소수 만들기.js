function solution(nums) {
  let numberOfPrimeCases = 0;
  for (let first = 0; first <= nums.length - 3; first++) {
    for (let second = first + 1; second <= nums.length - 2; second++) {
      for (let third = second + 1; third <= nums.length - 1; third++) {
        const sum = nums[first] + nums[second] + nums[third];
        if (isPrimeNumber(sum)) numberOfPrimeCases++;
      }
    }
  }

  return numberOfPrimeCases;
}

function isPrimeNumber(number) {
  for (let divisor = 2; divisor <= Math.sqrt(number); divisor++) {
    if (number % divisor == 0) return false;
  }
  return true;
}
