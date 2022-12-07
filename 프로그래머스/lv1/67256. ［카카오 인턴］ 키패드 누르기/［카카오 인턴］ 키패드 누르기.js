function solution(numbers, hand) {
  const leftRegex = /[147]/;
  const rightRegex = /[369]/;
  const direction = hand === 'left' ? 'L' : 'R';
  let position = [1, 4, 4, 4, 3, 3, 3, 2, 2, 2];
  let currentHandPosition = { left: [1, 1], right: [1, 1] };
  return numbers
    .map((number) => {
      if (leftRegex.test(number)) {
        currentHandPosition.left = [position[number], 1];
        return 'L';
      }
      if (rightRegex.test(number)) {
        currentHandPosition.right = [position[number], 1];
        return 'R';
      }

      let distanceLeft =
        Math.abs(position[number] - currentHandPosition.left[0]) + currentHandPosition.left[1];
      let distanceRight =
        Math.abs(position[number] - currentHandPosition.right[0]) + currentHandPosition.right[1];

      if (distanceLeft < distanceRight) {
        currentHandPosition.left = [position[number], 0];
        return 'L';
      }
      if (distanceLeft > distanceRight) {
        currentHandPosition.right = [position[number], 0];
        return 'R';
      }
      currentHandPosition[hand] = [position[number], 0];
      return direction;
    })
    .join('');
}
