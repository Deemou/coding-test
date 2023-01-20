function solution(k, dungeons) {
  let answer = 0;
  const filtered = dungeons.slice().filter((v) => v[0] <= k);

  for (let i = 0; i < filtered.length; i++) {
    const subAnswer = solution(
      k - filtered[i][1],
      filtered.filter((_, idx) => i !== idx)
    );
    if (subAnswer + 1 > answer) answer = subAnswer + 1;
    if (answer >= dungeons.length) return answer;
  }
  return answer;
}
