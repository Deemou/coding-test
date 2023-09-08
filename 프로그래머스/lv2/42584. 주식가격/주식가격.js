function solution(prices) {
  let answer = Array(prices.length).fill(0);
  let stack = [];

  for (let i = 0; i < prices.length; i++) {
    while (stack.length > 0 && prices[i] < prices[stack[stack.length - 1]]) {
      let top = stack.pop();
      answer[top] = i - top;
    }
    stack.push(i);
  }

  while (stack.length > 0) {
    let top = stack.pop();
    answer[top] = prices.length - 1 - top;
  }

  return answer;
}