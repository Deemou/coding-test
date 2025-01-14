function solution(number, k) {
  const stack = [];
  let drop = k;

  for (const num of number) {
    while (drop > 0 && stack.length && stack.at(-1) < num) {
      stack.pop();
      drop--;
    }
    stack.push(num);
  }

  return stack.slice(0, stack.length - drop).join("");
}
