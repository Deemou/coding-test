function solution(w, h) {
  if (w === h) return w * h - w;

  let answer = 0;

  for (let i = 1; i < w; i++) {
    const n = Math.floor((h * i) / w);
    answer += n;
  }
  answer *= 2;

  return answer;
}