function solution(order) {
  const stack = [];
  let cur = 1;
  let cnt = 0;

  for (const box of order) {
    while (cur <= box) {
      stack.push(cur++);
    }

    if (stack.pop() !== box) return cnt;
    cnt++;
  }

  return cnt;
}
