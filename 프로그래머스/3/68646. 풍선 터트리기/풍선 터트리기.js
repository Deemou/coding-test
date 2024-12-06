function solution(a) {
  const n = a.length;
  if (n <= 2) return n;

  let finalBalloonCount = 2;
  let left = Array(n).fill(Infinity);
  let right = Array(n).fill(Infinity);

  for (let i = 1; i < n; i++) {
    left[i] = Math.min(left[i - 1], a[i - 1]);
  }

  for (let i = n - 2; i >= 0; i--) {
    right[i] = Math.min(right[i + 1], a[i + 1]);
  }

  for (let i = 1; i < n - 1; i++) {
    if (a[i] > left[i] && a[i] > right[i]) continue;
    finalBalloonCount++;
  }

  return finalBalloonCount;
}