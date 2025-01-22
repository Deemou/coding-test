function solution(distance, rocks, n) {
  let left = 1;
  let right = distance;
  let answer = 0;

  rocks.sort((a, b) => a - b);
  rocks.push(distance);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (canRemove(mid, n)) {
      answer = mid;
      left = mid + 1;
    } else right = mid - 1;
  }

  return answer;

  function canRemove(dist, n) {
    let cnt = 0;
    let lastRock = 0;

    for (const rock of rocks) {
      if (rock - lastRock < dist) cnt++;
      else lastRock = rock;
    }

    return cnt <= n;
  }
}
