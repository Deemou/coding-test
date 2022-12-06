function solution(participant, completion) {
  participant.sort();
  completion.sort();
  return participant.find((name, index) => name != completion[index]);
}
