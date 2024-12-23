function solution(n, m, x, y, r, c, k) {
  const IMPOSSIBLE = "impossible";
  if (isImpossible(x, y, r, c, k)) return IMPOSSIBLE;

  const dirs = {
    u: { x: -1, y: 0 },
    r: { x: 0, y: 1 },
    l: { x: 0, y: -1 },
    d: { x: 1, y: 0 },
  };
  const stack = [[x, y, 0, ""]];

  while (stack.length) {
    const [cx, cy, step, path] = stack.pop();

    if (getDistance(cx, cy, r, c) > k - step) continue;
    if (step === k)
      if (cx === r && cy === c) return path;
      else continue;

    for (const [key, val] of Object.entries(dirs)) {
      const nx = cx + val.x;
      const ny = cy + val.y;
      if (nx < 1 || nx > n || ny < 1 || ny > m) continue;

      stack.push([nx, ny, step + 1, path + key]);
    }
  }

  return IMPOSSIBLE;
}

function getDistance(x, y, r, c) {
  return Math.abs(x - r) + Math.abs(y - c);
}

function isImpossible(x, y, r, c, k) {
  return getDistance(x, y, r, c) % 2 !== k % 2;
}