function solution(s) {
  const index = Math.floor(s.length / 2);
  if (s.length % 2 == 0) {
    return s.slice(index - 1, index + 1);
  }
  return s.at(index);
}
