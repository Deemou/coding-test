function solution(numbers, target) {
  let answer = 0;
  dfs(0, 0);

  function dfs(idx, val) {
    if (idx < numbers.length) {
      dfs(idx + 1, val + numbers[idx]);
      dfs(idx + 1, val - numbers[idx]);
    }
    if (idx === numbers.length && val === target) {
      answer++;
    }
  }
  return answer;
}
