function solution(n, stations, w) {
  let ans = 0;
  let lastIdx = 0;
  const size = 2 * w + 1;

  for (let station of stations) {
    const start = station - w - 1;
    ans += Math.ceil((start - lastIdx) / size);
    lastIdx = station + w;
  }
  ans += Math.ceil((n - lastIdx) / size);

  return ans;
}
