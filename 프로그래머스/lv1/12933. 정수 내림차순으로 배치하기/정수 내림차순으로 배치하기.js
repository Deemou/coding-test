function solution(n) {
  return Number(
    n
      .toString()
      .split("")
      .sort((a, b) => (a > b ? -1 : 0))
      .join("")
  );
}
