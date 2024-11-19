function solution(arrayA, arrayB) {
  let gcdA = arrayA[0];
  for (let i = 1; i < arrayA.length; i++) {
    gcdA = gcd(gcdA, arrayA[i]);
  }

  let gcdB = arrayB[0];
  for (let i = 1; i < arrayB.length; i++) {
    gcdB = gcd(gcdB, arrayB[i]);
  }

  let canA = true;
  let canB = true;

  for (let i = 0; i < arrayB.length; i++) {
    if (arrayB[i] % gcdA === 0) {
      canA = false;
      break;
    }
  }

  for (let i = 0; i < arrayA.length; i++) {
    if (arrayA[i] % gcdB === 0) {
      canB = false;
      break;
    }
  }

  if (canA && canB) return Math.max(gcdA, gcdB);
  else if (canA) return gcdA;
  else if (canB) return gcdB;
  else return 0;
}

function gcd(a, b) {
  while (b) {
    let temp = b;
    b = a % b;
    a = temp;
  }

  return a;
}
