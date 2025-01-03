function solution(arr) {
  return compress(0, 0, arr.length);

  function compress(x, y, size) {
    const initial = arr[x][y];
    let isSame = true;

    for (let i = x; i < x + size; i++) {
      for (let j = y; j < y + size; j++) {
        if (arr[i][j] === initial) continue;

        isSame = false;
        break;
      }

      if (!isSame) break;
    }

    if (isSame) return initial === 0 ? [1, 0] : [0, 1]; // [0의 개수, 1의 개수]
    else {
      const halfSize = size / 2;
      const topLeft = compress(x, y, halfSize);
      const topRight = compress(x, y + halfSize, halfSize);
      const bottomLeft = compress(x + halfSize, y, halfSize);
      const bottomRight = compress(x + halfSize, y + halfSize, halfSize);

      return [
        topLeft[0] + topRight[0] + bottomLeft[0] + bottomRight[0],
        topLeft[1] + topRight[1] + bottomLeft[1] + bottomRight[1],
      ];
    }
  }
}
