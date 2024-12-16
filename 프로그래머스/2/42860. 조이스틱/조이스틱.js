function solution(name) {
  const DEFAULT_CHARACTER = "A";
  const length = name.length;
  const nameArr = name.split("");
  let verticalMoves = 0;

  // 1. 수직 이동 횟수 계산
  for (const char of name) {
    verticalMoves += Math.min(
      char.charCodeAt(0) - DEFAULT_CHARACTER.charCodeAt(0),
      "Z".charCodeAt(0) - char.charCodeAt(0) + 1
    );
  }

  // 2. 수평 이동 횟수 계산
  // 한 방향으로만 갈 때
  nameArr[0] = DEFAULT_CHARACTER;
  const firstNonDefaultIndex = nameArr.findIndex(
    (v) => v !== DEFAULT_CHARACTER
  );
  let lastNonDefaultIndex = -1;

  for (let i = length - 1; i > 0; i--) {
    if (name[i] === DEFAULT_CHARACTER) continue;
    lastNonDefaultIndex = i;
    break;
  }

  if (firstNonDefaultIndex === -1) return verticalMoves;

  const rToLMoves = lastNonDefaultIndex;
  const lToRMoves = length - firstNonDefaultIndex;
  let horizontalMoves = Math.min(rToLMoves, lToRMoves);

  // 한 방향으로 갔다가 특정 지점에서 반대 방향으로 갈 때
  const halfLength = Math.ceil(length / 2);
  const leftHalf = nameArr.slice(0, halfLength);
  const rightHalf = nameArr.slice(halfLength);

  let lastNonDefaultIndexInLeft = -1;
  const firstNonDefaultIndexInRight = rightHalf.findIndex(
    (v) => v !== DEFAULT_CHARACTER
  );

  for (let i = halfLength - 1; i >= 0; i--) {
    if (leftHalf[i] === DEFAULT_CHARACTER) continue;
    lastNonDefaultIndexInLeft = i;
    break;
  }

  if (lastNonDefaultIndexInLeft !== -1 && firstNonDefaultIndexInRight !== -1) {
    const rightMoves = lastNonDefaultIndexInLeft;
    const leftMoves = rightHalf.length - firstNonDefaultIndexInRight;
    const smallMoves = Math.min(rightMoves, leftMoves);
    const bigMoves = Math.max(rightMoves, leftMoves);
    horizontalMoves = Math.min(horizontalMoves, smallMoves * 2 + bigMoves);
  }

  return verticalMoves + horizontalMoves;
}