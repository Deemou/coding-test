function solution(w, h) {
  const totalSquares = w * h;
  const cutSquares = w + h - gcd(w, h);

  return totalSquares - cutSquares;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}