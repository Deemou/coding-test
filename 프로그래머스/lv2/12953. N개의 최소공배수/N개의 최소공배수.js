function solution(arr) {
  let lsm = arr[0];
  for (let i = 1; i < arr.length; i++) {
    lsm = getLSM(lsm, arr[i]);
  }
  return lsm;
}

function getLSM(a, b) {
  const gcd = getGCD(Math.max(a, b), Math.min(a, b));
  return (a * b) / gcd;
}
function getGCD(a, b) {
  while (true) {
    let c = a % b;
    if (c === 0) return b;
    a = b;
    b = c;
  }
}
