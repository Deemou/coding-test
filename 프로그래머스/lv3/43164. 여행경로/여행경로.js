function solution(tickets) {
  const answer = [];
  const length = tickets.length;
  const visited = Array.from({ length: length });

  dfs(0, "ICN", "ICN");
  function dfs(cnt, start, path) {
    if (cnt === length) {
      answer.push(path.split(" "));
      return;
    }
    
    for (let i = 0; i < length; i++) {
      const [from, to] = tickets[i];
      if (start !== from) continue;
      if (visited[i]) continue;

      visited[i] = true;
      dfs(cnt + 1, to, path + " " + to);
      visited[i] = false;
    }
  }

  return answer.sort()[0];
}