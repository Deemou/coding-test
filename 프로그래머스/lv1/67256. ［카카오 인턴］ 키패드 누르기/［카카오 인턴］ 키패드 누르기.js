function solution(numbers, hand) {
  const LEFT_SIDE = [1, 4, 7, '*'];
  const MIDDLE = [2, 5, 8, 0];
  const RIGHT_SIDE = [3, 6, 9, '#'];
  let answer = '';
  let currentLeft = [0, 3];
  let currentRight = [2, 3];

  for (let i = 0; i < numbers.length; i++) {
    if (LEFT_SIDE.includes(numbers[i])) {
      answer += 'L';
      const leftIndex = LEFT_SIDE.findIndex((key) => key == numbers[i]);
      currentLeft = [0, leftIndex];
    } else if (RIGHT_SIDE.includes(numbers[i])) {
      answer += 'R';
      const rightIndex = RIGHT_SIDE.findIndex((key) => key == numbers[i]);
      currentRight = [2, rightIndex];
    } else {
      const middleIndex = MIDDLE.findIndex((key) => key == numbers[i]);
      const currentMiddle = [1, middleIndex];
      const leftSpace =
        Math.abs(currentLeft[0] - currentMiddle[0]) + Math.abs(currentLeft[1] - currentMiddle[1]);
      const rightSpace =
        Math.abs(currentRight[0] - currentMiddle[0]) + Math.abs(currentRight[1] - currentMiddle[1]);
      if (leftSpace < rightSpace) {
        answer += 'L';
        currentLeft = [...currentMiddle];
      } else if (leftSpace > rightSpace) {
        answer += 'R';
        currentRight = [...currentMiddle];
      } else {
        if (hand == 'left') {
          answer += 'L';
          currentLeft = [...currentMiddle];
        } else {
          answer += 'R';
          currentRight = [...currentMiddle];
        }
      }
    }
  }

  return answer;
}
