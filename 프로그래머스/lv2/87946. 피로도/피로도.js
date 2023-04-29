function solution(k, dungeons) {
  let ans = 0;
  const N = dungeons.length;
  const visits = Array(N).fill(false);

  dfs(k, 0);

  function dfs(energy, cnt) {
    ans = Math.max(ans, cnt);
    for (let i = 0; i < N; i++) {
      if (energy < dungeons[i][0] || visits[i]) continue;
      visits[i] = true;
      dfs(energy - dungeons[i][1], cnt + 1);
      visits[i] = false;
    }
  }
  return ans;
}
