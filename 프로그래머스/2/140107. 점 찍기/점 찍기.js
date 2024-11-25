function solution(k, d) {
  let cnt = 0;

  for (let x = 0; x <= d; x += k) {
    const maxY = Math.floor(Math.sqrt(d * d - x * x)); // 피타고라스 정리
    cnt += Math.floor(maxY / k) + 1; // y = 0인 경우 포함
  }

  return cnt;
}
