function solution(word) {
  const vowels = ["A", "E", "I", "O", "U"];
  let answer = 0;
  // 각 자릿수별로 가능한 조합의 수. 누적합
  let placeValue = [781, 156, 31, 6, 1];

  for (let i = 0; i < word.length; i++) {
    // 각 문자의 위치와 그 문자가 있는 자릿수별 가중치를 곱하고
    // 마지막으로 현재 자릿수까지 포함시키기 위해 +1
    answer += vowels.indexOf(word[i]) * placeValue[i] + 1;
  }

  return answer;
}