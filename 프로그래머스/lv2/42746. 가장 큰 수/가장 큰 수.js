function solution(numbers) {
  const answer = numbers
    .sort((a, b) => {
      const A = a.toString();
      const B = b.toString();
      if (A + B >= B + A) return -1;
      return 1;
    })
    .join('');

  if (answer[0] === '0') return '0';
  return answer;
}