function solution(a, b, n) {
  return countNumberOfBottles(a, b, n);
}

function countNumberOfBottles(required, received, own) {
  if (own < required) return 0;
  const numberOfTransactions = Math.round(own / required);
  const totalReceived = numberOfTransactions * received;
  return (
    totalReceived +
    countNumberOfBottles(required, received, own - required * numberOfTransactions + totalReceived)
  );
}
