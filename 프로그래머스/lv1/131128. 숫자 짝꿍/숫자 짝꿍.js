function solution(X, Y) {
  let answer = '';
  const strX = X.split('').sort();
  const strY = Y.split('').sort();
  while (strX.length != 0 && strY.length != 0) {
    const x = strX.at(-1);
    const y = strY.at(-1);
    if (x > y) strX.pop();
    else if (x < y) strY.pop();
    else {
      strX.pop();
      strY.pop();
      answer += x;
    }
  }
  if (answer == '') return '-1';
  if (/^0/g.test(answer)) return '0';
  return answer;
}
