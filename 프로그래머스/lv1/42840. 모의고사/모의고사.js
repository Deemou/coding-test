function solution(answers) {
  const firstPattern = [1, 2, 3, 4, 5];
  const secondPattern = [2, 1, 2, 3, 2, 4, 2, 5];
  const thirdPattern = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  const answerPatterns = [firstPattern, secondPattern, thirdPattern];

  const answerCounts = checkAnswersWithPatterns(answers, answerPatterns);
  const whoGotTheMostQuestionsRight =
    getWhoGotTheMostQuestionsRight(answerCounts);

  return whoGotTheMostQuestionsRight;
}

function checkAnswersWithPatterns(answers, answerPatterns) {
  return answerPatterns.reduce((answerCounts, answerPattern) => {
    const answerCount = checkAnswersWithPattern(answers, answerPattern);
    answerCounts.push(answerCount);
    return answerCounts;
  }, []);
}

function checkAnswersWithPattern(answers, answerPattern) {
  return answers.reduce((answerCount, answer, index) => {
    const answerPatternIndex = index % answerPattern.length;
    if (answerPattern[answerPatternIndex] == answer) answerCount++;
    return answerCount;
  }, 0);
}

function getWhoGotTheMostQuestionsRight(answerCounts) {
  const maxCount = getMaxCount(answerCounts);
  return answerCounts.reduce(
    (whoGotTheMostQuestionsRight, answerCount, index) => {
      if (answerCount == maxCount) whoGotTheMostQuestionsRight.push(index + 1);
      return whoGotTheMostQuestionsRight;
    },
    []
  );
}

function getMaxCount(answerCounts) {
  let maxCount = answerCounts[0];
  answerCounts.forEach((answerCount) => {
    if (answerCount > maxCount) maxCount = answerCount;
  });
  return maxCount;
}
