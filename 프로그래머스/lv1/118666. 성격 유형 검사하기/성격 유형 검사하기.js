function solution(survey, choices) {
  const indicators = [
    ['R', 'T'],
    ['C', 'F'],
    ['J', 'M'],
    ['A', 'N']
  ];
  const indicatorsWithScore = getIndicatorsWithScore(survey, choices);
  return indicators.reduce((answer, indicator, index) => {
    const former = indicatorsWithScore.get(indicator[0]) || 0;
    const latter = indicatorsWithScore.get(indicator[1]) || 0;
    if (former >= latter) answer += indicator[0];
    else answer += indicator[1];
    return answer;
  }, '');
}

function getIndicatorsWithScore(survey, choices) {
  return survey.reduce((indicatorsWithScore, item, index) => {
    const [indicatorIndex, score] = getResult(choices[index] - 1);
    const totalScore = indicatorsWithScore.get(item[indicatorIndex]) || 0;
    indicatorsWithScore.set(item[indicatorIndex], totalScore + score);
    return indicatorsWithScore;
  }, new Map());
}

function getResult(choice) {
  const results = [
    [0, 3],
    [0, 2],
    [0, 1],
    [0, 0],
    [1, 1],
    [1, 2],
    [1, 3]
  ];
  return results[choice];
}
