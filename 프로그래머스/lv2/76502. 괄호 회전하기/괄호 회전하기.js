function solution(s) {
  let answer = 0;
  const open = ['(', '{', '['];
  const close = [')', '}', ']'];
  for (let i = 0; i < s.length; i++) {
    const temp = s.slice(i, s.length) + s.slice(0, i);
    const stack = [];
    let j = 0;
    for (j; j < temp.length; j++) {
      const bracket = temp[j];
      if (open.includes(bracket)) stack.push(bracket);
      else if (close.includes(bracket)) {
        const top = stack.pop();
        if (close.indexOf(bracket) !== open.indexOf(top)) break;
      } else break;
    }
    if (j === temp.length && stack.length === 0) answer++;
  }
  return answer;
}
