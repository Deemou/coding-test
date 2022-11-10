//1.모든 명함을 길이가 긴 부분과 짧은 부분으로 구분한다.
//2.각 집합에서 최댓값을 찾는다.
function solution(sizes) {
  const maxWidth = Math.max(...sizes.map(card => Math.min(...card)));
  const maxHeight = Math.max(...sizes.map(card => Math.max(...card)));
  return maxWidth * maxHeight;
}