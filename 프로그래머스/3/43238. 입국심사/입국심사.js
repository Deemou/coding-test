function solution(n, times) {
  times.sort((a, b) => a - b);

  let left = 1,
    right = times[0] * n,
    minTime = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (canBeFinishedInTime(mid)) {
      minTime = mid;
      right = mid - 1;
    } else left = mid + 1;
  }

  return minTime;

  function canBeFinishedInTime(targetTime) {
    let peopleLeft = n;

    for (const time of times) {
      peopleLeft -= Math.floor(targetTime / time);
      if (peopleLeft <= 0) return true;
    }

    return false;
  }
}