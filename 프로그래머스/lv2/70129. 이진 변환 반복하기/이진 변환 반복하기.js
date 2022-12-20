function solution(n) {
  let transformCount = 0;
  let zeroCount = 0;
  let copiedString = n.slice();

  while (copiedString !== '1') {
    transformCount++;
    zeroCount += [...copiedString.matchAll(/0/g)].length;
    copiedString = copiedString.replace(/0/g, '');
    copiedString = copiedString.length.toString(2);
  }
  return [transformCount, zeroCount];
}
