function solution(begin, target, words) {
  let ans = Infinity;
  const N = words.length;
  const visits = Array(N).fill(false);

  dfs(begin, 0);

  function dfs(from, cnt) {
    if (from === target) {
      ans = Math.min(ans, cnt);
      return;
    }

    for (let i = 0; i < N; i++) {
      if (visits[i]) continue;
      const to = words[i];
      let match = 0;
      for (let j = 0; j < to.length; j++) {
        if (from[j] === to[j]) match++;
      }
      if (match !== to.length - 1) continue;
      visits[i] = true;
      dfs(to, cnt + 1);
      visits[i] = false;
    }
  }

  return ans === Infinity ? 0 : ans;
}

// function solution(begin, target, words) {
//   const shouldMatch = begin.length - 1;
//   const dist = Array(words.length + 1).fill(0);
//   const wordsPlus = [...words, begin];
//   const queue = [];
//   queue.push(words.length);

//   while (queue.length) {
//     const cur = queue.shift();
//     for (let i in wordsPlus) {
//       if (dist[i] !== 0) continue;
//       let match = 0;

//       for (let j in begin) {
//         if (wordsPlus[cur][j] === wordsPlus[i][j]) {
//           match++;
//         }
//       }

//       if (match !== shouldMatch) continue;
//       dist[i] = dist[cur] + 1;
//       if (wordsPlus[i] === target) return dist[i];
//       queue.push(i);
//     }
//   }

//   return 0;
// }
