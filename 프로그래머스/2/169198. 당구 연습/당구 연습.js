function solution(m, n, startX, startY, balls) {
  const results = [];

  balls.forEach((ball) => {
    const [targetX, targetY] = ball;
    const distances = [];

    // 벽
    // y = n
    if (startX !== targetX || startY > targetY)
      distances.push(getDistance(startX, startY, targetX, 2 * n - targetY));
    // y = 0
    if (startX !== targetX || startY < targetY)
      distances.push(getDistance(startX, startY, targetX, -targetY));
    // x = m
    if (startY !== targetY || startX > targetX)
      distances.push(getDistance(startX, startY, 2 * m - targetX, targetY));
    // x = 0
    if (startY !== targetY || startX < targetX)
      distances.push(getDistance(startX, startY, -targetX, targetY));

    // 꼭짓점
    const dx = targetX - startX;
    const dy = targetY - startY;
    // (0, 0)
    if (dx * startY === dy * startX && startX < targetX && startY < targetY)
      distances.push(getDistance(startX, startY, -targetX, -targetY));
    // (0, n)
    if (
      dx * (startY - n) === dy * startX &&
      startX < targetX &&
      startY > targetY
    )
      distances.push(getDistance(startX, startY, -targetX, 2 * n - targetY));
    // (m, 0)
    if (
      dx * startY === dy * (startX - m) &&
      startX > targetX &&
      startY < targetY
    )
      distances.push(getDistance(startX, startY, 2 * m - targetX, -targetY));
    // (m, n)
    if (
      dx * (startY - n) === dy * (startX - m) &&
      startX > targetX &&
      startY > targetY
    )
      distances.push(
        getDistance(startX, startY, 2 * m - targetX, 2 * n - targetY)
      );

    results.push(Math.min(...distances));
  });

  return results;
}

function getDistance(x1, y1, x2, y2) {
  return (x2 - x1) ** 2 + (y2 - y1) ** 2;
}
