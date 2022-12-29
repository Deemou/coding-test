function solution(w, h) {
  if (w === h) return w * h - w;

  const slope = h / w;
  let result = 0;

  for (let i = 1; i <= w; i++) {
    result += Math.ceil(slope * i);
  }

  return (w * h - result) * 2;
}