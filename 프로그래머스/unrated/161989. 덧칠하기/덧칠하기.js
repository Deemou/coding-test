function solution(n, m, section) {
  let cnt = 0;
  let end = 0;

  section.forEach((v) => {
    if (v > end) {
      cnt++;
      end = v + m - 1;
    }
  });

  return cnt;
}
