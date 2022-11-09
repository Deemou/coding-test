function solution(arr) {
  const stack = [];
  stack.push(arr[0]);

  for (let i = 1; i < arr.length; i++) {
    const topIndex = stack.length - 1;
    const top = stack[topIndex];
    if (top == arr[i]) {
      continue;
    }
    stack.push(arr[i]);
  }
  return stack;
}
