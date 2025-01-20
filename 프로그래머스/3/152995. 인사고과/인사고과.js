function solution(scores) {
  let rank = 1;
  const myScore = scores[0];
  const mySum = myScore[0] + myScore[1];
  const sortedScores = scores.slice(1).sort((a, b) => {
    const sumA = a[0] + a[1];
    const sumB = b[0] + b[1];

    return sumB - sumA;
  });

  for (let i = 0; i < sortedScores.length; i++) {
    if (myScore[0] < sortedScores[i][0] && myScore[1] < sortedScores[i][1])
      return -1;

    const sum = sortedScores[i][0] + sortedScores[i][1];
    if (mySum < sum) rank++;
    else break;
  }

  const tempRank = rank;
  for (let i = 1; i < tempRank - 1; i++) {
    for (let j = 0; j < i; j++) {
      if (
        sortedScores[i][0] < sortedScores[j][0] &&
        sortedScores[i][1] < sortedScores[j][1]
      ) {
        rank--;
        break;
      }
    }
  }

  return rank;
}
