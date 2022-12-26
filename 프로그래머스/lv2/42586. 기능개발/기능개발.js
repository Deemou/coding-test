function solution(progresses, speeds) {
  const answer = [];
  for (let i = 0; i < progresses.length; i++) {
    const neededDays = Math.ceil((100 - progresses[i]) / speeds[i]);
    let count = 0;
    for (let j = i; j < progresses.length; j++) {
      progresses[j] += speeds[j] * neededDays;
    }
    for (let j = i; j < progresses.length; j++) {
      if (progresses[j] < 100) break;
      count++;
    }
    answer.push(count);
    i += count - 1;
  }
  return answer;
}
