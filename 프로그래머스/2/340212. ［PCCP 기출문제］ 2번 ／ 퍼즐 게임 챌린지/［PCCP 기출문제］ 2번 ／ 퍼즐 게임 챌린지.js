function solution(diffs, times, limit) {
  const n = diffs.length;
  let left = 1,
    right = 0;
  for (const diff of diffs) {
    right = Math.max(right, diff);
  }

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canCompletePuzzle(mid)) right = mid;
    else left = mid + 1;
  }

  return right;

  function canCompletePuzzle(level) {
    let totalTime = times[0];

    for (let i = 1; i < n; i++) {
      const wrongCnt = Math.max(diffs[i] - level, 0);
      totalTime += wrongCnt * times[i - 1] + (wrongCnt + 1) * times[i];
      if (totalTime > limit) return false;
    }

    return true;
  }
}