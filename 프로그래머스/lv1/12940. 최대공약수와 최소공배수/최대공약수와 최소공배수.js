//유클리드 호제법(Euclidean Algorithm)
function solution(n, m) {
  const gcd = getGCD(n, m);
  const lcm = (n * m) / gcd;
  return [gcd, lcm];
}
function getGCD(n, m) {
  if (m == 0) return n;
  return getGCD(m, n % m);
}
