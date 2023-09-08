function solution(n, wires) {
  let answer = Infinity;
  let edges = Array.from({ length: n + 1 });
  const visited = Array.from({ length: n + 1 });

  for (let i = 0; i < wires.length; i++) {
    visited.fill(false);
    edges = edges.map(() => []);

    const seperated = wires.filter((_, idx) => i !== idx);
    seperated.forEach((v) => {
      edges[v[0]].push(v[1]);
      edges[v[1]].push(v[0]);
    });

    const cnts = [];
    for (let j = 1; j <= n; j++) {
      if (visited[j]) continue;
      const cnt = bfs(j);
      cnts.push(cnt);
    }
    answer = Math.min(answer, Math.abs(cnts[0] - cnts[1]));
  }

  return answer;

  function bfs(n) {
    visited[n] = true;
    const queue = [n];
    let cnt = 0;
    let front = 0;
    while (queue.length !== front) {
      const node = queue[front];
      front++;
      cnt++;
      for (let next of edges[node]) {
        if (visited[next]) continue;
        visited[next] = true;
        queue.push(next);
      }
    }
    return cnt++;
  }
}