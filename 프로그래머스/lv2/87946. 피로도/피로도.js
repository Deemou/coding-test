function solution(k, dungeons) {
  let answer = 0;
  const MINIMUM = 0;
  const USED = 1;
  const possibleDungeons = dungeons.slice().filter((v) => v[MINIMUM] <= k);

  for (let i = 0; i < possibleDungeons.length; i++) {
    const energy = k - possibleDungeons[i][USED];
    const rest = possibleDungeons.filter((_, idx) => i !== idx);
    const subAnswer = solution(energy, rest) + 1;
    if (subAnswer > answer) answer = subAnswer;
    if (answer === dungeons.length) return answer;
  }
  return answer;
}