function solution(tickets) {
  const answer = [];
  const start = 'ICN';
  const initVisit = Array(tickets.length).fill(false);
  const initPath = [start];

  function dfs(location, visit, path) {
    if (path.length === tickets.length + 1) {
      answer.push(path);
      return;
    }

    for (let i = 0; i < tickets.length; i++) {
      if (visit[i] === true) continue;
      const [from, to] = tickets[i];
      if (from !== location) continue;

      const newVisit = visit.slice();
      newVisit[i] = true;
      const newPath = [...path, to];
      dfs(to, newVisit, newPath);
    }
  }

  dfs(start, initVisit, initPath);

  let max = 0;
  for (let i = 1; i < answer.length; i++) {
    if (answer[max] > answer[i]) max = i;
  }
  return answer[max];
}