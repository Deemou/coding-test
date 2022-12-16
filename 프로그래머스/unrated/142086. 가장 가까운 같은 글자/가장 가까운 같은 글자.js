function solution(s) {
  const lettersWithDistance = new Map();
  const answer = [...s].map((letter, index) => {
    const distance = index - lettersWithDistance.get(letter) || -1;
    lettersWithDistance.set(letter, index);
    return distance;
  });
  return answer;
}
