function solution(s) {
  const answer = [];
  for (let i = 0; i < s.length; i++) {
    let count = -1;
    for (let j = i - 1; j >= 0; j--) {
      if (s[i] === s[j]) {
        count = i - j;
        break;
      }
    }
    answer.push(count);
  }
  return answer;
}
