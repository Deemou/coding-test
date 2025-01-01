function solution(s) {
  let maxLength = 1;

  for (let i = 0; i < s.length; i++) {
    // 홀수 길이
    maxLength = Math.max(maxLength, expandFromMiddle(i, i));
    // 짝수 길이
    maxLength = Math.max(maxLength, expandFromMiddle(i, i + 1));
  }

  return maxLength;

  function expandFromMiddle(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }
}
