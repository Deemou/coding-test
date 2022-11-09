function solution(n) {
  const RADIX = 3;
  return parseInt(n.toString(RADIX).split("").reverse().join(""), RADIX);
}
