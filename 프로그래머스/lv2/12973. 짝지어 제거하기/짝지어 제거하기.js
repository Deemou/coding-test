function solution(s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (stack.at(-1) === char) stack.pop();
    else stack.push(char);
  }
  return stack.length ? 0 : 1;
}
