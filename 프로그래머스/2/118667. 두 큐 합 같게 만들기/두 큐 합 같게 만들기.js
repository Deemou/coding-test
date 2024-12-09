function solution(queue1, queue2) {
  let sum1 = queue1.reduce((a, b) => a + b, 0);
  const sum2 = queue2.reduce((a, b) => a + b, 0);
  const totalSum = sum1 + sum2;
  if (totalSum % 2 !== 0) return -1;

  const target = totalSum / 2;
  const length1 = queue1.length;
  let start = 0,
    end = length1 - 1;
  const combined = [...queue1, ...queue2];
  const maxLength = combined.length;
  let operations = 0;
  const maxOperations = 3 * (length1 - 1);

  while (operations <= maxOperations) {
    if (sum1 === target) return operations;
    else if (sum1 < target) {
      end = (end + 1) % maxLength;
      sum1 += combined[end];
    } else sum1 -= combined[start++];

    operations++;
  }

  return -1;
}
