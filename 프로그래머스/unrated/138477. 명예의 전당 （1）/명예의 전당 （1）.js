function solution(k, scores) {
  const honors = [];
  return scores.reduce((answer, score) => {
    honors.push(score);
    honors.sort((a, b) => b - a).splice(k);
    answer.push(honors.at(-1));
    return answer;
  }, []);
}
