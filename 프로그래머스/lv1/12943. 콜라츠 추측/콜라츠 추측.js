function solution(num) {
  let cnt = 0;
  const limit = 500;

  if (num == 1) return 0;

  for (cnt = 1; cnt <= limit; cnt++) {
    if (num % 2 == 0) num = Math.floor(num / 2);
    else num = num * 3 + 1;
    if (num == 1) return cnt;
  }
  return -1;
}
