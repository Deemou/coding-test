function solution(land) {
  let dp = Array.from(Array(land.length), () => new Array(4).fill(0));

  // 초기 값 설정
  for (let i = 0; i < 4; i++) {
    dp[0][i] = land[0][i];
  }

  for (let i = 1; i < land.length; i++) {
    for (let j = 0; j < 4; j++) {
      // 이전 행에서 같은 열을 제외한 가장 큰 값을 찾아 더함
      dp[i][j] =
        Math.max(...dp[i - 1].filter((_, idx) => idx !== j)) + land[i][j];
    }
  }

  return Math.max(...dp[land.length - 1]);
}