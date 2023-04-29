function solution(tickets) {
  const ans = [];
  const N = tickets.length;
  const visits = Array(N).fill(false);

  dfs('ICN', ['ICN'], 0);

  function dfs(start, path, cnt) {
    if (cnt === N) {
      ans.push(path);
      return;
    }

    for (let i = 0; i < N; i++) {
      const [from, to] = tickets[i];
      if (from !== start || visits[i]) continue;
      visits[i] = true;
      dfs(to, [...path, to], cnt + 1);
      visits[i] = false;
    }
  }

  return ans.sort()[0];
}
