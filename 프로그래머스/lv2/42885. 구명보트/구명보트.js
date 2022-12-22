function solution(people, limit) {
  const copiedPeople = [...people].sort((a, b) => a - b);
  let heavyIndex = copiedPeople.length - 1;
  let lightIndex = 0;
  let answer = 0;
  while (heavyIndex > lightIndex) {
    answer++;
    const weight = copiedPeople[heavyIndex] + copiedPeople[lightIndex];
    if (weight <= limit) lightIndex++;
    heavyIndex--;
  }
  if (heavyIndex === lightIndex) answer++;
  return answer;
}
