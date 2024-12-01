function solution(word) {
  const vowels = ["A", "E", "I", "O", "U"];
  const MAX_LENGTH = 5;
  const placeValues = getPlaceValues(MAX_LENGTH, vowels.length);
  let answer = 0;

  for (let i = 0; i < word.length; i++) {
    answer += vowels.indexOf(word[i]) * placeValues[i] + 1;
  }

  return answer;
}

function getPlaceValues(length, caseCount) {
  const placeValues = [1];
  for (let i = 1; i < length; i++) {
    const combCounts = placeValues[i - 1] + Math.pow(caseCount, i);
    placeValues.push(combCounts);
  }

  return placeValues.reverse();
}
