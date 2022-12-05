function solution(dartResult) {
  let dartNumber = -1;
  const numberRegex = /\d{1,}/g;

  const dartScore = dartResult.match(numberRegex).map((score) => Number(score));

  for (let i = 0; i < dartResult.length; i++) {
    const char = dartResult[i];
    if (isBonus(char)) {
      dartNumber += 1;
      const bonusPower = getBonusPower(char);
      dartScore[dartNumber] = Math.pow(dartScore[dartNumber], bonusPower);
    } else if (isOption(char)) {
      if (char == '*') {
        dartScore[dartNumber] *= 2;
        dartScore[dartNumber - 1] *= 2;
      } else if (char == '#') dartScore[dartNumber] *= -1;
    }
  }

  let totalScore = 0;
  dartScore.forEach((score) => (totalScore += score));
  return totalScore;
}

function isBonus(bonus) {
  return /[SDT]/g.test(bonus);
}

function isOption(option) {
  return /[*#]/g.test(option);
}

function getBonusPower(bonus) {
  if (bonus == 'S') return 1;
  if (bonus == 'D') return 2;
  if (bonus == 'T') return 3;
}
