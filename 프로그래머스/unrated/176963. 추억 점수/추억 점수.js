function solution(name, yearning, photo) {
  let answer = [];

  const scores = new Map();
  for (let i = 0; i < name.length; i++) {
    scores.set(name[i], yearning[i]);
  }

  photo.forEach((names) => {
    const sum = names.reduce((s, v) => {
      const score = scores.get(v) || 0;
      return s + score;
    }, 0);
    answer.push(sum);
  });

  return answer;
}
