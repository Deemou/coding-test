function solution(routes) {
  routes.sort((a, b) => a[0] - b[0]);

  let camCnt = 0;
  let lastCamPos = -Infinity;

  for (const [start, end] of routes) {
    if (start > lastCamPos) {
      camCnt++;
      lastCamPos = end;
    } else lastCamPos = Math.min(lastCamPos, end);
  }

  return camCnt;
}
