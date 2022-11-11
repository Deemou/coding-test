function solution(ingredient) {
  const RIGHT_ORDER = [1, 2, 3, 1];
  const ORDER_LENGTH = 4;
  let count = 0;
  let stack = [];

  for (let i = 0; i < ingredient.length; i++) {
    stack.push(ingredient[i]);

    if (stack.length < ORDER_LENGTH) continue;

    let j = 0;
    for (j; j < ORDER_LENGTH; j++) {
      const index = stack.length - ORDER_LENGTH + j;
      if (stack[index] !== RIGHT_ORDER[j]) break;
    }
    if (j != ORDER_LENGTH) continue;

    for (let k = 0; k < ORDER_LENGTH; k++) {
      stack.pop();
    }
    count++;
  }
  return count;
}
