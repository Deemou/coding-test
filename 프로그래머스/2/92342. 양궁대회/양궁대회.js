function solution(n, info) {
  const MAX_SCORE = 10;

  const answer = Array(MAX_SCORE + 1).fill(0);
  let maxDiff = -1;
  let bestAnswer = [-1];

  dfs(0, n, 0);

  return maxDiff > 0 ? bestAnswer : [-1];

  function isBestAnswer(current, best) {
    for (let i = MAX_SCORE; i >= 0; i--) {
      if (current[i] > best[i]) return true;
      if (current[i] < best[i]) return false;
    }
    return false;
  }

  function dfs(index, arrowsLeft, scoreDiff) {
    if (arrowsLeft === 0 && scoreDiff < maxDiff) return;
    if (index === MAX_SCORE + 1) {
      answer[MAX_SCORE] = arrowsLeft;

      if (
        scoreDiff > maxDiff ||
        (scoreDiff === maxDiff && isBestAnswer(answer, bestAnswer))
      ) {
        maxDiff = scoreDiff;
        bestAnswer = [...answer];
      }
      answer[MAX_SCORE] = 0;

      return;
    }

    const score = MAX_SCORE - index;
    // case 1: 라이언이 index 점수를 얻기 위해 화살을 추가
    if (arrowsLeft > info[index]) {
      const usedArrows = info[index] + 1;
      answer[index] += usedArrows;
      dfs(index + 1, arrowsLeft - usedArrows, scoreDiff + score);
      answer[index] -= usedArrows;
    }

    // case 2: 라이언이 index 점수를 얻지 않음
    if (info[index] > 0) scoreDiff -= score;
    dfs(index + 1, arrowsLeft, scoreDiff);
  }
}
