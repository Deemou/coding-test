function solution(s) {
  return JSON.parse(
    s.replace(/{|}/g, (bracket) => {
      return bracket === '{' ? '[' : ']';
    })
  )
    .sort((a, b) => a.length - b.length)
    .reduce((answer, set) => {
      return answer.concat(set.filter((x) => !answer.includes(x)));
    }, []);
}