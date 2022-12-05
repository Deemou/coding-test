function solution(dartResult) {
  const dartsRegex = /\d{1,}.?\D/g;
  const dartRegex = /(\d{1,})(S|D|T)(\*|#)?/;

  const bonuses = { S: 1, D: 2, T: 3 },
    options = { '*': 2, '#': -1, undefined: 1 };

  const darts = dartResult.match(dartsRegex);

  for (let i = 0; i < darts.length; i++) {
    const split = darts[i].match(dartRegex);
    const baseScore = split[1];
    const bonus = split[2];
    const option = split[3];
    const score = Math.pow(baseScore, bonuses[bonus]) * options[option];

    if (option === '*' && darts[i - 1]) darts[i - 1] *= options['*'];
    darts[i] = score;
  }

  return darts.reduce((totalScore, score) => totalScore + score);
}
