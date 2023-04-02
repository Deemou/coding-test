function solution(tickets) {
  const answer = [];
  const start = 'ICN';
  const initPath = [start];

  function dfs(location, leftTickets, path) {
    if (leftTickets.length === 0) {
      answer.push(path);
      return;
    }

    for (let i = 0; i < leftTickets.length; i++) {
      const [from, to] = leftTickets[i];
      if (from !== location) continue;

      const left = leftTickets.filter((_, idx) => i !== idx);
      const newPath = [...path, to];

      dfs(to, left, newPath);
    }
  }

  dfs(start, tickets, initPath);

  let max = 0;
  for (let i = 1; i < answer.length; i++) {
    if (answer[max] > answer[i]) max = i;
  }
  return answer[max];
}