function solution(points, routes) {
  let collisionCount = 0;
  const robotPathCounts = new Map();

  for (const route of routes) {
    let t = 0;
    let [r, c] = points[route[0] - 1];
    recordRobotPath(t, r, c);

    for (let i = 1; i < route.length; i++) {
      const point = route[i] - 1;
      const [nr, nc] = points[point];
      const rStep = nr > r ? 1 : -1;
      const cStep = nc > c ? 1 : -1;

      while (r !== nr) {
        t++;
        r += rStep;
        recordRobotPath(t, r, c);
      }
      while (c !== nc) {
        t++;
        c += cStep;
        recordRobotPath(t, r, c);
      }
    }
  }

  for (const cnt of robotPathCounts.values()) {
    if (cnt > 1) collisionCount++;
  }

  return collisionCount;

  function recordRobotPath(t, r, c) {
    const key = `${t},${r},${c}`;
    const cnt = (robotPathCounts.get(key) || 0) + 1;
    robotPathCounts.set(key, cnt);
  }
}
