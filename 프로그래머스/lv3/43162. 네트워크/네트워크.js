function solution(n, computers) {
  let answer = 0;
  const visit = new Array(n).fill(0);
  const queue = [];

  for (let i = 0; i < n; i++) {
    if (visit[i] === 1) continue;
    answer++;
    visit[i] = 1;
    queue.push(i);
    while (queue.length !== 0) {
      const cur = queue.shift();
      for (let j = 0; j < n; j++) {
        if (j === cur) continue;
        if (computers[cur][j] === 0) continue;
        if (visit[j] === 1) continue;
        visit[j] = 1;
        queue.push(j);
      }
    }
  }
  return answer;
}