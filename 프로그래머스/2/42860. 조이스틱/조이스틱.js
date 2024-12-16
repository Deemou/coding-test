function solution(name) {
  const DEFAULT_CHARACTER = "A";
  const LAST_ALPHABET = "Z";

  const length = name.length;
  let verticalMoves = 0;

  // 1. 수직 이동 횟수 계산
  for (const char of name) {
    verticalMoves += Math.min(
      char.charCodeAt(0) - DEFAULT_CHARACTER.charCodeAt(0),
      LAST_ALPHABET.charCodeAt(0) - char.charCodeAt(0) + 1
    );
  }

  // 2. 수평 이동 횟수 계산
  let horizontalMoves = length - 1;
  for (let i = 1; i < length; i++) {
    if (name[i] !== DEFAULT_CHARACTER) continue;

    let j = i + 1;
    while (j < length && name[j] === DEFAULT_CHARACTER) {
      j++;
    }

    const rightMoves = i - 1;
    const leftMoves = length - j;
    const smallerMoves = Math.min(rightMoves, leftMoves);
    const largerMoves = Math.max(rightMoves, leftMoves);
    horizontalMoves = Math.min(horizontalMoves, smallerMoves * 2 + largerMoves);

    i = j; // 연속된 A 구간 건너뛰기
  }

  return verticalMoves + horizontalMoves;
}