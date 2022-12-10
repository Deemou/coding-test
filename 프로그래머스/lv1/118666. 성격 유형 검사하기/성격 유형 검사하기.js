function solution(survey, choices) {
  const test = new PersonalityTypeTest();
  return test.getSurveyResult(survey, choices);
}

class PersonalityTypeTest {
  #indicators;
  #results;
  constructor() {
    this.initIndicators();
    this.initResults();
  }

  initIndicators() {
    this.#indicators = [
      ['R', 'T'],
      ['C', 'F'],
      ['J', 'M'],
      ['A', 'N']
    ];
  }

  initResults() {
    this.#results = [
      [0, 3],
      [0, 2],
      [0, 1],
      [0, 0],
      [1, 1],
      [1, 2],
      [1, 3]
    ];
  }

  getSurveyResult(survey, choices) {
    const indicatorsWithScore = this.getIndicatorsWithScore(survey, choices);
    return this.#indicators.reduce((answer, indicator) => {
      const former = indicator[0];
      const latter = indicator[1];
      const formerScore = indicatorsWithScore.get(former) || 0;
      const latterScore = indicatorsWithScore.get(latter) || 0;
      if (formerScore >= latterScore) answer += former;
      else answer += latter;
      return answer;
    }, '');
  }

  getIndicatorsWithScore(survey, choices) {
    return survey.reduce((indicatorsWithScore, item, index) => {
      const [indicatorIndex, score] = this.getResult(choices[index] - 1);
      const totalScore = indicatorsWithScore.get(item[indicatorIndex]) || 0;
      indicatorsWithScore.set(item[indicatorIndex], totalScore + score);
      return indicatorsWithScore;
    }, new Map());
  }

  getResult(choice) {
    return this.#results[choice];
  }
}
