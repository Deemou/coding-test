function solution(s) {
  const arr = s.match(/\d+/g);
  const counts = arr.reduce((map, number) => {
    number = Number(number);
    const count = map.get(number) + 1 || 1;
    return map.set(number, count);
  }, new Map());

  const answer = [];
  for ([key, _] of counts) {
    answer.push(key);
  }
  answer.sort((a, b) => counts.get(b) - counts.get(a));

  return answer;
}