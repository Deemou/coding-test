function solution(key, lock) {
  const M = key.length;
  const N = lock.length;
  let lockHoles = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (lock[i][j] === 0) lockHoles++;
    }
  }

  for (let rot = 0; rot < 4; rot++) {
    key = rotate(key);

    for (let i = -M + 1; i < N; i++) {
      for (let j = -M + 1; j < N; j++) {
        if (check(key, i, j)) return true;
      }
    }
  }

  return false;

  function rotate(key) {
    const newKey = [];

    for (let i = 0; i < M; i++) {
      newKey[i] = [];

      for (let j = 0; j < M; j++) {
        newKey[i][j] = key[M - j - 1][i];
      }
    }

    return newKey;
  }

  function check(key, x, y) {
    let filledHoles = 0;

    for (let i = 0; i < M; i++) {
      for (let j = 0; j < M; j++) {
        const lockX = x + i;
        const lockY = y + j;
        if (lockX < 0 || lockX >= N || lockY < 0 || lockY >= N) continue;
        if (key[i][j] === lock[lockX][lockY]) return false;
        if (key[i][j] === 1 && lock[lockX][lockY] === 0) filledHoles++;
      }
    }

    return lockHoles === filledHoles;
  }
}
