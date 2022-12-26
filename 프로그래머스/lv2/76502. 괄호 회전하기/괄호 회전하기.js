function solution(s) {
  if (s.length % 2 === 1) return 0;

  let answer = 0;
  const openBrackets = ['(', '{', '['];
  const closeOpenPair = { ')': '(', '}': '{', ']': '[' };

  for (let i = 0; i < s.length; i++) {
    const stack = [];
    const rotate = s.slice(i) + s.slice(0, i);
    let isCorrectBracketString = true;

    for (let j = 0; j < s.length; j++) {
      const bracket = rotate[j];
      if (openBrackets.includes(bracket)) stack.push(bracket);
      else {
        const lastBracket = stack.pop();
        if (lastBracket !== closeOpenPair[bracket]) {
          isCorrectBracketString = false;
          break;
        }
      }
    }

    if (isCorrectBracketString) answer++;
  }

  return answer;
}
