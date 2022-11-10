function solution(strings, n) {
  return strings.sort((a, b) => {
    const char1 = a.charAt(n);
    const char2 = b.charAt(n);
    if (char1 > char2) return 1;
    if (char1 < char2) return -1;
    if (a > b) return 1;
    return -1;
  });
}