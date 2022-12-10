function solution(survey, choices) {
  const indicatorsWithScore = {};
  const types = ['RT', 'CF', 'JM', 'AN'];

  types.forEach((type) => type.split('').forEach((char) => (indicatorsWithScore[char] = 0)));

  choices.forEach((choice, index) => {
    const [disagree, agree] = survey[index];

    indicatorsWithScore[choice > 4 ? agree : disagree] += Math.abs(choice - 4);
  });

  return types.map(([a, b]) => (indicatorsWithScore[a] >= indicatorsWithScore[b] ? a : b)).join('');
}
