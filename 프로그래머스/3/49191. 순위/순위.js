class Player {
  constructor(id) {
    this.id = id;
    this.wins = [];
    this.loses = [];
  }
}

function solution(n, results) {
  const players = Array.from({ length: n + 1 }, (_, i) => new Player(i));
  let answer = 0;

  for (const [winner, loser] of results) {
    players[winner].wins.push(loser);
    players[loser].loses.push(winner);
  }

  const visited = Array(n + 1).fill(false);

  for (let i = 1; i <= n; i++) {
    visited.fill(false);

    const winCount = dfs(players[i], "wins");
    const loseCount = dfs(players[i], "loses");

    if (winCount + loseCount === n - 1) answer++;
  }

  return answer;

  function dfs(player, graph) {
    let cnt = 0;

    for (const opponentId of graph === "wins" ? player.wins : player.loses) {
      if (visited[opponentId]) continue;
      visited[opponentId] = true;

      cnt += 1 + dfs(players[opponentId], graph);
    }

    return cnt;
  }
}
