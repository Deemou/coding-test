function solution(stones, k) {
  let left = 0;
  let right = getMax(stones);

  while (left < right) {
    const mid = Math.ceil((left + right) / 2);
    if (canCross(stones, k, mid)) left = mid;
    else right = mid - 1;
  }

  return left;
}

function getMax(arr) {
  return arr.reduce((max, v) => (max >= v ? max : v), -Infinity);
}

function canCross(stones, k, numOfFriends) {
  let jump = 0;

  for (let i = 0; i < stones.length; i++) {
    if (stones[i] >= numOfFriends) jump = 0;
    else jump++;
    if (jump >= k) return false;
  }

  return true;
}