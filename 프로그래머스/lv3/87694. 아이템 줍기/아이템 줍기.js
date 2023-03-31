function solution(rectangle, characterX, characterY, itemX, itemY) {
  const dx = [0, 1, 0, -1],
    dy = [1, 0, -1, 0];

  // 1. 좌표 값 2배로 만들기
  const min = 2;
  const rectangle2x = [];
  for (let rect of rectangle) {
    let [minX, minY, maxX, maxY] = rect;
    minX = 2 * minX;
    minY = 2 * minY;
    maxX = 2 * maxX;
    maxY = 2 * maxY;
    rectangle2x.push([minX, minY, maxX, maxY]);
  }
  characterX = 2 * characterX;
  characterY = 2 * characterY;
  itemX = 2 * itemX;
  itemY = 2 * itemY;

  // 2. 경로의 방문 가능 여부를 체크할 배열 만들기
  let max = 0;
  for (let rect2x of rectangle2x) {
    let temp = Math.max(...rect2x);
    if (temp > max) max = temp;
  }
  const maps = Array(max + 1)
    .fill()
    .map(() => Array(max + 1).fill(false));

  //3.직사각형의 변들을 방문 가능한 경로로 만들기
  for (let rect2x of rectangle2x) {
    let [minX, minY, maxX, maxY] = rect2x;
    for (let i = minX; i <= maxX; i++) {
      maps[i][minY] = true;
      maps[i][maxY] = true;
    }
    for (let i = minY; i <= maxY; i++) {
      maps[minX][i] = true;
      maps[maxX][i] = true;
    }
  }

  // 4. 겹치는 부분을 방문 불가능한 경로로 만들기
  for (let rect2x of rectangle2x) {
    let [minX, minY, maxX, maxY] = rect2x;
    for (let i = minX; i <= maxX; i++)
      for (let j = minY; j <= maxY; j++)
        if (i > minX && i < maxX && j > minY && j < maxY) maps[i][j] = false;
  }

  // 5. BFS 사용해서 최단 경로 찾기
  const queue = [[characterX, characterY, 0]];
  while (queue.length > 0) {
    let [x, y, dist] = queue.shift();

    for (let dir = 0; dir < 4; dir++) {
      const newX = x + dx[dir],
        newY = y + dy[dir];

      if (newX < min || newY < min || newX > max || newY > max) continue;
      if (maps[newX][newY] !== true) continue;
      if (newX === itemX && newY === itemY) return (dist + 1) / 2;

      maps[newX][newY] = false;
      queue.push([newX, newY, dist + 1]);
    }
  }
}
